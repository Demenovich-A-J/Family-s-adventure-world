IF OBJECT_ID('[dbo].[PropertyValue]') IS NULL
BEGIN
	create table PropertyValue (
	   PropertyValueId      uniqueidentifier     not null,
	   PropertyName         nvarchar(256)        null,
	   Value                nvarchar(256)        null,
	   ValueType            int                  null,
	   constraint PK_PropertyValue primary key nonclustered (PropertyValueId)
	)
END
GO

IF OBJECT_ID('[dbo].[ExpressionProperty]') IS NULL
BEGIN
	create table ExpressionProperty (
	   ExpressionPropertyId uniqueidentifier     not null,
	   LeftPropertyValueId  uniqueidentifier     not null,
	   RightPropertyValueId uniqueidentifier     not null,
	   AchivmentId          uniqueidentifier     not null,
	   ModelName            nvarchar(256)        not null,
	   [Order]              int                  not null,
	   Comparer             int                  not null,
	   Connector            int                  null,
	   constraint PK_ExpressionProperty primary key nonclustered (ExpressionPropertyId)
	)
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_ExpressionProperty_Achivment'))
BEGIN
	alter table ExpressionProperty
	   add constraint FK_ExpressionProperty_Achivment foreign key (AchivmentId)
		  references Achivment (AchivmentId)
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_ExpressionProperty_LeftPropertyValue'))
BEGIN
	alter table ExpressionProperty
	   add constraint FK_ExpressionProperty_LeftPropertyValue foreign key (LeftPropertyValueId)
		  references PropertyValue (PropertyValueId)
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_ExpressionProperty_RightPropertyValue'))
BEGIN
	alter table ExpressionProperty
	   add constraint FK_ExpressionProperty_RightPropertyValue foreign key (RightPropertyValueId)
		  references PropertyValue (PropertyValueId)
END
GO