USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[GetLastRootCategory]    Script Date: 11/29/2024 9:51:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER procedure [dbo].[GetLastRootCategory]
as
begin
    SELECT TOP 1 *
    FROM Categories
    WHERE ParentId IS NULL
    ORDER BY CategoryOrder DESC; 

	end

 