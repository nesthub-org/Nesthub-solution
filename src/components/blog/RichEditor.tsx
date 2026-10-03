import { useEffect, useRef, useState, type ReactNode } from 'react'
import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Placeholder } from '@tiptap/extensions'
import type { UploadedImage } from '../../lib/blog'

interface RichEditorProps {
  initialContent: string
  onChange: (html: string) => void
  onUpload: (file: File) => Promise<UploadedImage>
}

const altFromFilename = (name: string) =>
  name
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

function MenuButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void
  active?: boolean
  label: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      // Keep the editor selection while clicking the toolbar
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[14px] font-semibold transition-colors ${
        active ? 'text-brand-200' : 'text-white hover:text-brand-200'
      }`}
    >
      {children}
    </button>
  )
}

/**
 * Medium-style editor: a clean writing surface with a floating format bar
 * on text selection and a "+" inserter on empty lines. Images can also be
 * pasted or dropped straight in; they upload to Cloudinary via the API.
 */
export function RichEditor({ initialContent, onChange, onUpload }: RichEditorProps) {
  const [uploading, setUploading] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [insertOpen, setInsertOpen] = useState(false)
  const [linkMode, setLinkMode] = useState(false)
  const [linkValue, setLinkValue] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)
  const editorRef = useRef<Editor | null>(null)

  const uploadAndInsert = async (files: File[], pos?: number) => {
    const editor = editorRef.current
    if (!editor) return
    setUploadError(null)
    for (const file of files) {
      setUploading((n) => n + 1)
      try {
        const img = await onUpload(file)
        const chain = editor.chain().focus()
        if (pos !== undefined) chain.setTextSelection(pos)
        chain
          .setImage({ src: img.url, alt: altFromFilename(file.name), width: img.width, height: img.height })
          .createParagraphNear()
          .run()
      } catch (e) {
        setUploadError(e instanceof Error ? e.message : 'Image upload failed')
      } finally {
        setUploading((n) => n - 1)
      }
    }
  }

  const imageFiles = (list?: FileList | null) => Array.from(list ?? []).filter((f) => f.type.startsWith('image/'))

  const editor = useEditor({
    immediatelyRender: true,
    extensions: [
      StarterKit.configure({
        // The post title is the page's only <h1>; body headings start at h2
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
      Image.configure({ allowBase64: false }),
      Placeholder.configure({
        placeholder: ({ node }) => (node.type.name === 'heading' ? 'Heading' : 'Tell your story… (type, paste or drop images)'),
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: { class: 'blog-prose blog-editor min-h-[420px] outline-none' },
      handlePaste: (_view, event) => {
        const files = imageFiles(event.clipboardData?.files)
        if (!files.length) return false
        event.preventDefault()
        void uploadAndInsert(files)
        return true
      },
      handleDrop: (view, event) => {
        const files = imageFiles((event as DragEvent).dataTransfer?.files)
        if (!files.length) return false
        event.preventDefault()
        const coords = view.posAtCoords({ left: event.clientX, top: event.clientY })
        void uploadAndInsert(files, coords?.pos)
        return true
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  useEffect(() => {
    editorRef.current = editor
  }, [editor])

  const active = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      underline: e.isActive('underline'),
      strike: e.isActive('strike'),
      code: e.isActive('code'),
      link: e.isActive('link'),
      h2: e.isActive('heading', { level: 2 }),
      h3: e.isActive('heading', { level: 3 }),
      quote: e.isActive('blockquote'),
      image: e.isActive('image'),
    }),
  })

  const openLink = () => {
    setLinkValue((editor.getAttributes('link').href as string | undefined) ?? '')
    setLinkMode(true)
  }

  const applyLink = () => {
    const href = linkValue.trim()
    const chain = editor.chain().focus().extendMarkRange('link')
    if (href) chain.setLink({ href: /^(https?:|mailto:|tel:|\/)/i.test(href) ? href : `https://${href}` }).run()
    else chain.unsetLink().run()
    setLinkMode(false)
  }

  const editAlt = () => {
    const current = (editor.getAttributes('image').alt as string | undefined) ?? ''
    const alt = window.prompt('Describe this image (alt text helps Google Images and screen readers):', current)
    if (alt !== null) editor.chain().focus().updateAttributes('image', { alt: alt.trim() }).run()
  }

  const insertItems: { label: string; icon: ReactNode; run: () => void }[] = [
    {
      label: 'Image',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
        </svg>
      ),
      run: () => fileInput.current?.click() },
    { label: 'Heading', icon: 'H2', run: () => editor.chain().focus().setHeading({ level: 2 }).run() },
    { label: 'Subheading', icon: 'H3', run: () => editor.chain().focus().setHeading({ level: 3 }).run() },
    { label: 'Bulleted list', icon: '•', run: () => editor.chain().focus().toggleBulletList().run() },
    { label: 'Numbered list', icon: '1.', run: () => editor.chain().focus().toggleOrderedList().run() },
    { label: 'Quote', icon: '❝', run: () => editor.chain().focus().setBlockquote().run() },
    { label: 'Code block', icon: '</>', run: () => editor.chain().focus().setCodeBlock().run() },
    { label: 'Divider', icon: '—', run: () => editor.chain().focus().setHorizontalRule().run() },
  ]

  return (
    <div className="relative">
      <BubbleMenu
        editor={editor}
        pluginKey="textMenu"
        shouldShow={({ editor: e, from, to }) => from !== to && !e.isActive('image') && !e.isActive('codeBlock')}
        className="flex items-center gap-0.5 rounded-xl bg-ink px-1.5 py-1 shadow-[0_10px_30px_rgba(0,0,0,.25)]"
      >
        {linkMode ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              applyLink()
            }}
            className="flex items-center gap-1"
          >
            <input
              autoFocus
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setLinkMode(false)}
              placeholder="Paste or type a link…"
              className="w-60 bg-transparent px-2 py-1 text-[14px] text-white outline-none placeholder:text-white/50"
            />
            <button type="submit" className="px-2 text-[13px] font-semibold text-brand-200">
              Apply
            </button>
          </form>
        ) : (
          <>
            <MenuButton label="Bold" active={active.bold} onClick={() => editor.chain().focus().toggleBold().run()}>
              B
            </MenuButton>
            <MenuButton label="Italic" active={active.italic} onClick={() => editor.chain().focus().toggleItalic().run()}>
              <span className="italic">i</span>
            </MenuButton>
            <MenuButton label="Underline" active={active.underline} onClick={() => editor.chain().focus().toggleUnderline().run()}>
              <span className="underline">U</span>
            </MenuButton>
            <MenuButton label="Strikethrough" active={active.strike} onClick={() => editor.chain().focus().toggleStrike().run()}>
              <span className="line-through">S</span>
            </MenuButton>
            <MenuButton label="Link" active={active.link} onClick={openLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
                <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
              </svg>
            </MenuButton>
            <span className="mx-1 h-5 w-px bg-white/20" />
            <MenuButton label="Heading" active={active.h2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
              H2
            </MenuButton>
            <MenuButton label="Subheading" active={active.h3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
              H3
            </MenuButton>
            <MenuButton label="Quote" active={active.quote} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
              ❝
            </MenuButton>
            <MenuButton label="Inline code" active={active.code} onClick={() => editor.chain().focus().toggleCode().run()}>
              {'<>'}
            </MenuButton>
          </>
        )}
      </BubbleMenu>

      <BubbleMenu
        editor={editor}
        pluginKey="imageMenu"
        shouldShow={({ editor: e }) => e.isActive('image')}
        className="flex items-center gap-0.5 rounded-xl bg-ink px-1.5 py-1 shadow-[0_10px_30px_rgba(0,0,0,.25)]"
      >
        <MenuButton label="Edit alt text" onClick={editAlt}>
          Alt text
        </MenuButton>
        <MenuButton label="Remove image" onClick={() => editor.chain().focus().deleteSelection().run()}>
          Remove
        </MenuButton>
      </BubbleMenu>

      <FloatingMenu
        editor={editor}
        options={{ placement: 'left-start', offset: 12 }}
        className="flex items-center gap-2"
      >
        <button
          type="button"
          aria-label={insertOpen ? 'Close insert menu' : 'Insert block'}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setInsertOpen((o) => !o)}
          className={`flex h-8 w-8 items-center justify-center rounded-full border border-muted/50 bg-white text-[20px] leading-none text-muted transition-transform hover:border-ink hover:text-ink ${
            insertOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </button>
        {insertOpen && (
          <div className="flex items-center gap-1 rounded-xl border border-line bg-white px-1.5 py-1 shadow-[0_10px_30px_rgba(0,0,0,.08)]">
            {insertItems.map((item) => (
              <button
                key={item.label}
                type="button"
                title={item.label}
                aria-label={item.label}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  item.run()
                  setInsertOpen(false)
                }}
                className="flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[13.5px] font-semibold text-ink hover:bg-surface"
              >
                {item.icon}
              </button>
            ))}
          </div>
        )}
      </FloatingMenu>

      <EditorContent editor={editor} />

      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        multiple
        hidden
        onChange={(e) => {
          const files = imageFiles(e.target.files)
          e.target.value = ''
          if (files.length) void uploadAndInsert(files)
        }}
      />

      {(uploading > 0 || uploadError) && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          {uploading > 0 ? (
            <div className="flex items-center gap-2.5 rounded-xl bg-ink px-4 py-2.5 text-[14px] text-white shadow-lg">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Uploading {uploading > 1 ? `${uploading} images` : 'image'}…
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setUploadError(null)}
              className="rounded-xl bg-red-600 px-4 py-2.5 text-[14px] text-white shadow-lg"
            >
              {uploadError} ✕
            </button>
          )}
        </div>
      )}
    </div>
  )
}
