import { Component } from 'react'
import { Document, Text } from 'redocx'

class App extends Component {
  render() {
    return (
      <Document>
        <Text style={{ color: 'red' }}>Hello World</Text>
      </Document>
    );
  }
}

render(<App />).then((stream) => {
  fs.open('sample.docx', 'w+', stream.length, null, (err, fd) => {
    if (err) {
      console.log(err);
    }

    fs.write(fd, stream.toBuffer(), (writeErr) => {
      if (writeErr) {
        console.log(writeErr);
      }
      console.log('Docx generated and saved to sample.docx');
    });
  });
});