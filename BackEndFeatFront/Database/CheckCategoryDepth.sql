USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[CheckCategoryDepth]    Script Date: 11/29/2024 9:51:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[CheckCategoryDepth]
    @CategoryId INT,
    @MaxDepth INT = 4,
    @IsValid BIT OUTPUT
AS
BEGIN
    DECLARE @CurrentDepth INT = 1;
    DECLARE @ParentId INT;

    
    SELECT @ParentId = ParentId FROM Categories WHERE Id = @CategoryId;

    WHILE @ParentId IS NOT NULL
    BEGIN
        SET @CurrentDepth = @CurrentDepth + 1;

        
        IF @CurrentDepth > @MaxDepth
        BEGIN
            SET @IsValid = 0;
            RETURN;
        END;

       
        SELECT @ParentId = ParentId FROM Categories WHERE Id = @ParentId;
    END;

    SET @IsValid = 1;
END;
