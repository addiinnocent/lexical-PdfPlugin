import { Font, StyleSheet, Document, Page, View, Text } from '@react-pdf/renderer';
import { $getRoot } from 'lexical';

function PdfPlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();
    const styles = StyleSheet.create({
      page: {
        backgroundColor: '#fff',
        padding: '40px',
        fontSize: '12px',
      },
      h1: {
        fontSize: '24px',
        fontWeight: '400',
        margin: 0,
        marginBottom: '12px',
        padding: 0,
      },
      h2: {
        fontSize: '15px',
        color: 'rgb(101, 103, 107)',
        fontWeight: 700,
        marginTop: '10px',
        marginBottom: '10px',
        textTransform: 'uppercase',
      },
      paragraph: {
        marginBottom: '8px',
      },
    });

    function $generatePdfFromNodes() {
      const root = $getRoot();
      const topLevelNodes = root.getChildren();

      /*function diveDeep(node) {
        let format = {};
        if (node.__format == 1) format = { fontFamily: 'Times-Bold' };
        if (node.__format == 2) format = { fontFamily: 'Times-Italic' };

        return (
          <Text key={node.__key} style={format}>
            {node.__text}
          </Text>
        );
      }*/

      return (
        <Document>
          <Page size="A4" style={styles.page}>
          {topLevelNodes.map(topLevelNode => (
            <View key={topLevelNode.__key} style={styles[topLevelNode.__tag || 'paragraph']}>
              <Text>{topLevelNode.getTextContent()}</Text>
            </View>
          ))}
          </Page>
        </Document>
      );
    }

    useEffect(() => {
      return editor.registerCommand(
        DOWNLOAD_COMMAND,
        (payload) => {
          payload($generatePdfFromNodes());
          return true;
        }, 1
      );
    }, [editor]);

    return null;
  }

<button onClick={() => {
     				editor.dispatchCommand(DOWNLOAD_COMMAND, async(file) => {
                    const blob = await pdf(file).toBlob();
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = `${doc.title}.pdf`;
                    link.click();
                  });
                }}
>Download PDF</button>
