USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[InsertGallery]    Script Date: 11/29/2024 9:52:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:    Name
-- Create date: 
-- Description:  
-- =============================================
ALTER PROCEDURE [dbo].[InsertGallery] 
  -- Add the parameters for the stored procedure here
  @ProductId int = 0, 
  @Name nvarchar(50),
  @IsMain bit =0,
  @IsDeleted bit = 0,
    @CreateDate datetime = null,
    @UpdateDate datetime = null
AS
BEGIN
   -- Check if @CreateDate is null, set it to the current date
    IF @CreateDate IS NULL
        SET @CreateDate = GETDATE();

    -- Check if @UpdateDate is null, set it to the current date
    IF @UpdateDate IS NULL
        SET @UpdateDate = GETDATE();

        INSERT INTO Galleries
        (ProductId, Name, IsMain, IsDeleted, CreateDate, UpdateDate)
    VALUES
        (@ProductId, @Name, @IsMain, @IsDeleted, @CreateDate, @UpdateDate);

    select * from Galleries where ProductId =  @ProductId
END