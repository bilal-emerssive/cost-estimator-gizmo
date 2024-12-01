import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { FileText, Upload } from "lucide-react";

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
      className={`glass-card p-12 text-center cursor-pointer transition-all duration-300 hover:border-primary/50 
        ${isDragActive ? 'border-primary scale-[1.02] bg-primary/5' : 'border-border'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          {file ? (
            <FileText className="w-10 h-10 text-primary" />
          ) : (
            <Upload className="w-10 h-10 text-primary" />
          )}
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-semibold text-primary">
            {isDragActive ? "Drop your file here" : "Upload Project Documentation"}
          </p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Drag & drop your project documentation file here, or click to select. We support PDF, DOC, and TXT files.
          </p>
        </div>
        {file && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm font-medium text-primary flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {file.name}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}