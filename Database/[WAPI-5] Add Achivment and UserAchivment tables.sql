IF OBJECT_ID('[dbo].[Achivment]') IS NULL
BEGIN
	create table Achivment (
	   AchivmentId          uniqueidentifier     not null,
	   Description          nvarchar(256)        not null,
	   Name                 nvarchar(256)        not null,
	   Expression           xml                  not null,
	   CreatedOn            datetime             not null  CONSTRAINT DF_Achivment_CreatedOn DEFAULT getdate(),
	   UpdatedOn            datetime             not null  CONSTRAINT DF_Achivment_UpdatedOn DEFAULT getdate(),
	   ImageUrl             nvarchar(2000)       not null,
	   Enabled				bit					 not null,
	   constraint PK_Achivment primary key nonclustered (AchivmentId)
	)
END
GO

IF OBJECT_ID('[dbo].[UserAchivment]') IS NULL
BEGIN
	create table UserAchivment (
		UserId               uniqueidentifier     not null,
		UserAchivmentId      uniqueidentifier     not null  default newsequentialid(),
		AchivmentId          uniqueidentifier     not null,
		CreatedOn            datetime             not null CONSTRAINT DF_UserAchivment_CreatedOn DEFAULT getdate(),
		constraint PK_UserAchivment primary key (UserAchivmentId)
	)
END


IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_UserAchivment_User')
			AND parent_object_id = OBJECT_ID(N'Quest'))
BEGIN
	alter table UserAchivment
	   add constraint FK_UserAchivment_User foreign key (UserId)
		  references [User] (UserId)
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_UserAchivment_Achivment')
			AND parent_object_id = OBJECT_ID(N'Quest'))
BEGIN
	alter table UserAchivment
	   add constraint FK_UserAchivment_Achivment foreign key (AchivmentId)
		  references [Achivment] (AchivmentId)
END