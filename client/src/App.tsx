import ReactQuill, { Quill } from "react-quill";

import Connection from "./Connection";

import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";

const Editor = () => {
  const [data, setDelta] = useState({});
  const connection = Connection.get("examples", "richtext");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image", "clean"],
    ],
  };

  const handleChange = (delta: any, oldDelta: any, source: any) => {
    console.log(oldDelta);
    if (source !== "user") {
      return;
    }
    connection.submitOp(delta);
  };

  useEffect(() => {
    connection.subscribe(function (error: any) {
      if (error) {
        console.log("Error:", error);
      }

      setDelta(connection.data);
      connection.on("op", function (op: any, source: any) {
        if (source === true) {
          return;
        }

        setDelta(op);
      });
    });
  }, [connection]);

  return (
    <div>
      <ReactQuill
        value={data as any}
        onChange={handleChange}
        modules={modules}
      />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Editor />
    </div>
  );
};

export default App;
