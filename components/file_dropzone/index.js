import React, { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import show_toast from '~/utils/functions/toast'
import ButtonComponent from '../Button/Button';
import Icons from '~/public/icons';

const options = {
    resume_options: {
        accept: { 'application/pdf': ['.pdf'] },
        max_file: 1,
        file_size_limit: 5 * 1024 * 1024,
        key_name: "resume_file",
        content: "Upload or drag and drop your resume here (PDF only, max 5MB)."
    },
    cover_letter_options:{
        accept: { 'application/pdf': ['.pdf'] },
        max_file: 1,
        file_size_limit: 5 * 1024 * 1024,
        key_name: "cover_letter_file",
        content: "Upload or drag and drop your cover letter here (PDF only, max 5MB)."
    }
};

export default function MyDropzone({ option_key = "", container_classname = "", state = {}, setState = () => { } }) {

    const current_options = useMemo(() => {
        return options[option_key] || {};
    }, [option_key]);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        let updated_state = { ...state }
        updated_state[current_options?.key_name] = file;
        updated_state.use_existing_resume = false;

        if (!file)
            return show_toast({ type: "error", message: "Invalid file type" });

        if (current_options?.file_size_limit && file.size > current_options.file_size_limit)
            return show_toast({ type: "error", message: "File size exceeds the limit" });

        setState(updated_state);
    }, [current_options, setState]);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: current_options?.max_file || 1,
        accept: current_options?.accept || {},
        noDragEventsBubbling: true,
    });

    function delete_selected_file() {
        let updated_state = { ...state }
        updated_state[current_options?.key_name] = null;
        setState(updated_state);
    }

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ?
                <div className="dropzone_container">
                    <p>Drop the files here ...</p>
                </div>
                :
                <div className={`dropzone_container ${container_classname || ""}`}>
                    {
                        state[current_options?.key_name]?.name ?
                            <>
                                <div className="dropzone_icon">
                                    {Icons.upload_icon}
                                </div>
                                <div className="col word_break">
                                    {state[current_options?.key_name].name}
                                </div>
                                <div className="dropzone_delete_icon">
                                    <ButtonComponent className="btn-outline-danger" onClick={(e) => { e.stopPropagation(); delete_selected_file(); }}>
                                        {Icons.delete_icon}
                                    </ButtonComponent>
                                </div>

                            </>
                            :
                            <>
                                <div className="dropzone_icon">
                                    {Icons.upload_icon}
                                </div>
                                <div className="col">
                                    <p className='mb-1'>{current_options.content}</p>
                                    <p className='text-secondary mb-0'>
                                        Only {Object.values(current_options.accept || {}).flat().join(', ')} Format supported
                                    </p>
                                </div>
                            </>
                    }
                </div>
            }
        </div>
    );
}