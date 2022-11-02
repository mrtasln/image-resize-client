import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
function ImageSelector(props) {

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [src, setSrc] = useState();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        setSrc(objectUrl);
        return () => URL.revokeObjectURL(objectUrl)

    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])

    }

    useEffect(() => {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var img = new Image();

        img.onload = function () {

            // set size proportional to image
            canvas.height = canvas.width * (img.height / img.width);

            // step 1 - resize to 50%
            var oc = document.createElement('canvas'),
                octx = oc.getContext('2d');

            oc.width = img.width * 0.5;
            oc.height = img.height * 0.5;
            octx.drawImage(img, 0, 0, oc.width, oc.height);

            // step 2
            octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

            // step 3, resize to final size
            ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
                0, 0, canvas.width, canvas.height);
            let test =  document.getElementById("test");
            test.src =  canvas.toDataURL("image/jpeg", 1.0);
        }

        img.src = src;


    }, src);



    return (
        <div>
            <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Control type="file" size="lg" accept="image/*" onChange={onSelectFile} />
                {selectedFile &&  <img src={preview}  width={1080}/>
                }
                <canvas id="canvas" className="d-none" width="1080"/>
                <img id="test" width="1080" />
            </Form.Group>

        </div>
    );
}

export default ImageSelector;