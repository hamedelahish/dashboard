USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[GetLastSubCategory]    Script Date: 11/29/2024 9:52:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER procedure [dbo].[GetLastSubCategory]
@ParentId INT
as
begin
 	  SELECT TOP 1*
    FROM Categories
    WHERE ParentId =@ParentId
    ORDER BY CategoryOrder DESC;

	end

 