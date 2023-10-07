import { useState } from 'react';

const FileSection = ({ courseId, files, removeFile }) => {
    const [courseID, setCourseID] = useState(courseId);

    const handleDeleteClick = (id) => {
        const shouldDelete = window.confirm('Vous êtes sur de vouloir effacer ce support ?');

        if (shouldDelete) {
            removeFile(id);
        }
    }

    const handleDownload = (id, originalFilename) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = `${process.env.REACT_APP_API_URL}/course/${courseId}/fileupload/${id}`;
        downloadLink.setAttribute('download', originalFilename);
        downloadLink.click();
    };

    return (
        <div className="container-add-question">
            <ul>
                {files &&
                    files.map((file, key) => (
                        <li key={key} className="m-top-2">
                            <a onClick={() => handleDownload(file.id, file.originalFilename)} className="download-link">
                                {file.originalFilename}
                            </a>
                            <button onClick={() => handleDeleteClick(file.id)} className="btn-delete-file">Effacer</button>
                            <button onClick={() => handleDownload(file.id, file.originalFilename)} className="btn-download m-left">Télécharger</button>

                        </li>
                    ))}
            </ul>
        </div>
    )
};

export default FileSection;