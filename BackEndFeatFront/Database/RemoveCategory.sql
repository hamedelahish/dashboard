USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[RemoveCategory]    Script Date: 11/29/2024 9:53:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[RemoveCategory] @CategoryId INT AS BEGIN
  
  SET NOCOUNT ON;
  IF
    EXISTS ( SELECT 1 FROM Products WHERE CategoryId = @CategoryId ) BEGIN
      RAISERROR ( N'امکان حذف دسته بندی به دلیل تداخل با محصول وجود ندارد', 16, 1 );
      RETURN;
      
    END UPDATE Categories 
    SET IsDeleted = 1 
  WHERE
    Id = @CategoryId;
  SELECT
    N'دسته بندی با موفقیت حذف شد' AS Message;

END;