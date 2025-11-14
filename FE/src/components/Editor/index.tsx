import {
  useState,
  useEffect,
  useMemo,
  type ComponentPropsWithoutRef,
} from 'react';
import type { ClassicEditor as ClassicEditorType } from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Autosave,
  Essentials,
  Paragraph,
  Link,
  BlockQuote,
  Bold,
  Table,
  TableToolbar,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  List,
  TableCaption,
  TodoList,
  Underline,
  Fullscreen,
  Autoformat,
  TextTransformation,
  Strikethrough,
  Subscript,
  Superscript,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Highlight,
  HorizontalLine,
  Alignment,
  PlainTableOutput,
  MediaEmbed,
  Markdown,
  PasteFromMarkdownExperimental,
  BalloonToolbar,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

const LICENSE_KEY = import.meta.env.VITE_CKE_LICENSE;

type EditorProps = {
  value?: string;
  onChange?: (value: string) => void;
} & Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>;

const Editor = ({ value = '', onChange, className, ...rest }: EditorProps) => {
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        licenseKey: LICENSE_KEY,
        toolbar: {
          items: [
            'undo',
            'redo',
            '|',
            'fullscreen',
            '|',
            'heading',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'subscript',
            'superscript',
            '|',
            'horizontalLine',
            'link',
            'mediaEmbed',
            'insertTable',
            'highlight',
            'blockQuote',
            '|',
            'alignment',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            'outdent',
            'indent',
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          Autoformat,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          Bold,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          Fullscreen,
          Heading,
          Highlight,
          HorizontalLine,
          Indent,
          IndentBlock,
          Italic,
          Link,
          List,
          Markdown,
          MediaEmbed,
          Paragraph,
          PasteFromMarkdownExperimental,
          PlainTableOutput,
          Strikethrough,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
        ],
        balloonToolbar: [
          'bold',
          'italic',
          '|',
          'link',
          '|',
          'bulletedList',
          'numberedList',
        ],
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, 'default', 18, 20, 22],
          supportAllValues: true,
        },
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
        },
        placeholder: 'Type or paste your content here!',
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
        },
      },
    };
  }, [isLayoutReady]);

  return (
    <div className={className} {...rest}>
      {editorConfig && (
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={value}
          onChange={(_, editor: ClassicEditorType) => {
            onChange?.(editor.getData());
          }}
        />
      )}
    </div>
  );
};

export default Editor;
