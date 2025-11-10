import React, { useState, useEffect } from "react";
import { axiosInstance } from "../Config";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast, ToastContainer } from "react-toastify";

const PrivacyPolicy = () => {
  const [users, setUsers] = useState({
    title: "",
    content: "",
  });

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // Handle input changes (title)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle editor changes (content)
  const handleEditorChange = (state) => {
    setEditorState(state);
    const htmlContent = draftToHtml(convertToRaw(state.getCurrentContent()));
    setUsers((prevData) => ({
      ...prevData,
      content: htmlContent,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plainText = users.content
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, "")
      .trim();

    if (!users.title.trim() || !plainText) {
      toast.warning("Please fill in content field before submitting!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", users.title);
      formData.append("content", users.content);

      await axiosInstance.post(`/getPrivacy`, formData);
      toast.success("Terms & Conditions updated successfully!");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("Failed to update Terms & Conditions!");
    }
  };

  // Fetch existing data
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`/getPrivacy`);
      const data = res.data;
      setUsers(data);

      // Convert HTML to editor state
      if (data?.content) {
        const blocksFromHtml = htmlToDraft(data.content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        setEditorState(EditorState.createWithContent(contentState));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-2">
                <h6 className="text-white text-capitalize ps-3">Privacy Policy</h6>
              </div>
            </div>

            <div className="card-body px-4 pb-4">
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="form-group mb-3">
                  <label htmlFor="title" className="col-form-label fw-bold">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    readOnly
                    className="form-control border border-dark border-opacity-75 ps-3"
                    value={users.title}
                    onChange={handleChange}
                  />
                </div>

                {/* Content */}
                <div className="form-group mb-3">
                  <label className="col-form-label fw-bold">Content</label>
                  <div className="border border-dark border-opacity-75 rounded p-2 bg-light">
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={handleEditorChange}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-dark mt-3"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>

  );
};

export default PrivacyPolicy;
