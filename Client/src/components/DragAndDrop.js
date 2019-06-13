import React from 'react';
import Dropzone from 'react-dropzone';


// const CLOUDINARY_UPLOAD_PRESET = 'bmzjbxoq';
// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/react-cloudinary/upload';

export default class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    console.log(file)  
  }

  render() {
    return (
      <form style={{ height: '100%' }}>
        <div style={{ height: '100%' }}>
          <Dropzone onDrop={acceptedFiles => this.onImageDrop(acceptedFiles)} style={{ height: '100%' }}>
            {({getRootProps, getInputProps}) => (
              <section style={{height:"100%"}}>
                <div {...getRootProps()} style={{ height: '100%',display:'flex'}}>
                  <input {...getInputProps()} />
                  <p style={{ textAlign: "center", margin: "auto"}}> {this.props.text} </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} alt = "img" />
          </div>}
        </div>
      </form>
    )
  }
}