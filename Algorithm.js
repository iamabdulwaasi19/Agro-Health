BEGIN
    // Step 1: Client Image Capture and Upload
    IF User_Interface == Mobile THEN
        Captured_Image = Capture_Via_Native_Camera()
    ELSE
        Captured_Image = Select_Via_File_Uploader()
    END IF
    
    // Step 2: Backend Transmission
    Transmit_Multipart_Form_Data(Captured_Image, Target_Backend_Server)
    
    BEGIN Backend_Processing
        // Step 3: Cloud Hosting Integration
        Cloudinary_Response = Upload_To_Cloudinary(Captured_Image)
        Image_Secure_URL = Cloudinary_Response.Secure_Url
        
        // Step 4: Prompt Construction and API Call
        System_Pathology_Prompt = Construct_System_Instructions() 
        Gemini_Payload = Combine(Image_Secure_URL, System_Pathology_Prompt)
        
        // Execute External Inference Request
        AI_Response = Call_Gemini_2.5_Flash_API(Gemini_Payload)
        
        // Step 5: Data Persistence
        Diagnostic_Log = Create_Log_Payload(Image_Secure_URL, AI_Response)
        Save_To_MongoDB(Diagnostic_Log)
        
        // Step 6: Response Dispatch
        Return_JSON_To_Client(AI_Response)
    END Backend_Processing
    
    // Step 7: Client Presentation
    Render_Pathologist_Report(AI_Response)
END