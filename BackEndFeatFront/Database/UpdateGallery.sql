USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[UpdateGallery]    Script Date: 11/16/2024 8:15:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[UpdateGallery]
    @ProductId INT,
    @GalleryId INT,
    @GalleryUrl NVARCHAR(200) = NULL,
    @IsMain BIT = NULL,
    @IsDeleted BIT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Galleries
    SET 
        Name = COALESCE(@GalleryUrl, Name),
        IsMain = COALESCE(@IsMain, IsMain),
        isDeleted = COALESCE(@IsDeleted, isDeleted)
    WHERE id = @GalleryId AND ProductId = @ProductId;
END;
