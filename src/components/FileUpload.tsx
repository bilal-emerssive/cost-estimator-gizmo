import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    const validTypes = ["application/pdf", "application/msword", "text/plain"];
    
    if (!validTypes.includes(uploadedFile.type)) {
      toast.error("Please upload a PDF, DOC, or TXT file");
      return;
    }
    
    setFile(uploadedFile);
    toast.success("File uploaded successfully!");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt']
    },
    maxFiles: 1
  });

  return (
    <Card
      {...getRootProps()}
      className={`glass-card p-8 text-center cursor-pointer transition-all duration-300 
        ${isDragActive ? 'border-primary' : 'border-border'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <div>
          <p className="text-lg font-medium">
            {isDragActive ? "Drop the file here" : "Drag & drop your file here"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            or click to select a file
          </p>
        </div>
        {file && (
          <p className="text-sm text-primary mt-4">
            Selected: {file.name}
          </p>
        )}
      </div>
    </Card>
  );
}