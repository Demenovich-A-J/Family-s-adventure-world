/*==============================================================*/
/* Table: Account                                               */
/*==============================================================*/
IF OBJECT_ID('[dbo].[Account]') IS NULL
BEGIN
	CREATE TABLE [dbo].[Account](
		[AccountId] [uniqueidentifier] NOT NULL CONSTRAINT DF_AccountId DEFAULT newsequentialid(),
		[UserName] [nvarchar](100) NOT NULL,
		[PasswordHash] [nvarchar](100) NOT NULL,
		[PasswordSalt] [nvarchar](100) NOT NULL,
		[Token] [uniqueidentifier] NULL,
		[TokenExpireDate] [datetime] NULL,
		[Status] [integer] NOT NULL,
		[CreatedOn] [datetime] NOT NULL CONSTRAINT DF_Account_CreatedOn DEFAULT getdate(),
		[UpdatedOn] [datetime] NOT NULL CONSTRAINT DF_Account_UpdatedOn DEFAULT getdate(),
		[Email] [nvarchar](255) NOT NULL,
		[VerifiedOn] [datetime] NULL,
		CONSTRAINT [PK_Account] PRIMARY KEY 
		(
			[AccountId] 
		)
	)
END

/*==============================================================*/
/* Table: Claim                                                 */
/*==============================================================*/
IF OBJECT_ID('[dbo].[Claim]') IS NULL
BEGIN
	CREATE TABLE [dbo].[Claim](
		[ClaimId] [uniqueidentifier] NOT NULL CONSTRAINT DF_ClaimId DEFAULT newsequentialid(),
		[Name] [nvarchar](255) NOT NULL,
		[Description] [nvarchar](255) NOT NULL,
		CONSTRAINT [PK_Claim] PRIMARY KEY 
		(
			[ClaimId] 
		)
	)
END

/*==============================================================*/
/* Table: Family                                                */
/*==============================================================*/
IF OBJECT_ID('[dbo].[Family]') IS NULL
BEGIN
	CREATE TABLE [dbo].[Family](
		[FamilyId] [uniqueidentifier] NOT NULL CONSTRAINT DF_FamilyId DEFAULT newsequentialid(),
		[Name] [nvarchar](100) NOT NULL,
		[CreatedOn] [timestamp] NOT NULL,
		[UpdatedOn] [datetime] NOT NULL,
		[CreatedById] [uniqueidentifier] NOT NULL,
		CONSTRAINT [PK_Family] PRIMARY KEY 
		(
			[FamilyId]
		)
	)
END

/*==============================================================*/
/* Table: Item                                                  */
/*==============================================================*/
IF OBJECT_ID('[dbo].[Item]') IS NULL
BEGIN
	CREATE TABLE [dbo].[Item](
		[ItemId] [uniqueidentifier] NOT NULL CONSTRAINT DF_ItemId DEFAULT newsequentialid(),
		[Name] [nvarchar](300) NOT NULL,
		[Description] [nvarchar](max) NOT NULL,
		[ImagePath] [nvarchar](255) NULL,
		[SiteUrl] [nvarchar](max) NOT NULL,
		[Cost] [decimal](9, 4) NOT NULL,
		[CreatedById] [uniqueidentifier] NULL,
		[CreatedOn] [timestamp] NOT NULL,
		[UpdatedOn] [datetime] NOT NULL,
		CONSTRAINT [PK_Item] PRIMARY KEY 
		(
			[ItemId]
		)
	)
END

/*==============================================================*/
/* Table: Quest                                                 */
/*==============================================================*/
IF OBJECT_ID('[dbo].[Quest]') IS NULL
BEGIN
	CREATE TABLE [dbo].[Quest](
		[QuestId] [uniqueidentifier] NOT NULL CONSTRAINT DF_QuestId DEFAULT newsequentialid(),
		[Name] [nvarchar](255) NOT NULL,
		[Description] [nvarchar](max) NOT NULL,
		[ParentQuestId] [uniqueidentifier] NULL,
		[CreatedById] [uniqueidentifier] NOT NULL,
		[IsPublic] [bit] NOT NULL,
		[Expirience] [int] NOT NULL,
		[Coins] [decimal](10, 2) NOT NULL,
		[RequiredLVL] [int] NOT NULL,
		[CreatedOn] [timestamp] NOT NULL,
		[UpdatedOn] [datetime] NOT NULL,
		CONSTRAINT [PK_Quest] PRIMARY KEY 
		(
			[QuestId]
		)
	)
END

/*==============================================================*/
/* Table: Seetting                                              */
/*==============================================================*/
IF OBJECT_ID('[dbo].[Setting]') IS NULL
BEGIN
	CREATE TABLE [dbo].[Setting](
		[SettingId] [uniqueidentifier] NOT NULL CONSTRAINT DF_SettingId DEFAULT newsequentialid(),
		[Name] [nvarchar](100) NOT NULL,
		[Value] [nvarchar](100) NOT NULL,
		CONSTRAINT [PK_Seetting] PRIMARY KEY 
		(
			[SettingId]
		)
	)
END

/*==============================================================*/
/* Table: User                                                  */
/*==============================================================*/
IF OBJECT_ID('[dbo].[User]') IS NULL
BEGIN
	CREATE TABLE [dbo].[User](
		[UserId] [uniqueidentifier] NOT NULL CONSTRAINT DF_UserId DEFAULT newsequentialid(),
		[FamilyId] [uniqueidentifier] NULL,
		[Email] [nvarchar](255) NOT NULL,
		[FirstName] [nvarchar](255) NOT NULL,
		[LastName] [nvarchar](255) NOT NULL,
		[AccountId] [uniqueidentifier] NOT NULL,
		[UserTypeId] [uniqueidentifier] NOT NULL,
		[Gender] [nvarchar](50) NOT NULL,
		[BirthDate] [date] NOT NULL,
		CONSTRAINT [PK_User] PRIMARY KEY 
		(
			[UserId]
		)
	)
END

/*==============================================================*/
/* Table: UserItem                                                 */
/*==============================================================*/
IF OBJECT_ID('[dbo].[UserItem]') IS NULL
BEGIN
	CREATE TABLE [dbo].[UserItem](
		[UserItemId] [uniqueidentifier] NOT NULL CONSTRAINT DF_UserItemId DEFAULT newsequentialid(),
		[UserId] [uniqueidentifier] NOT NULL,
		[ItemId] [uniqueidentifier] NOT NULL,
		CONSTRAINT [PK_UserItem] PRIMARY KEY 
		(
			[UserItemId]
		)
	)
END

/*==============================================================*/
/* Table: UserQuest                                             */
/*==============================================================*/
IF OBJECT_ID('[dbo].[UserQuest]') IS NULL
BEGIN
	CREATE TABLE [dbo].[UserQuest](
		[UserQuestId] [uniqueidentifier] NOT NULL CONSTRAINT DF_UserQuestId DEFAULT newsequentialid(),
		[UserId] [uniqueidentifier] NOT NULL,
		[QuestId] [uniqueidentifier] NOT NULL,
		[ParentUserQuestId] [uniqueidentifier] NULL,
		[Status] nvarchar(50) NOT NULL,
		[CreatedOn] datetime NOT NULL,
		[UpdatedOn] datetime NOT NULL,
		CONSTRAINT [PK_UserQuest] PRIMARY KEY 
		(
			[UserQuestId]
		)
	)
END

/*==============================================================*/
/* Table: UserType                                              */
/*==============================================================*/
IF OBJECT_ID('[dbo].[UserType]') IS NULL
BEGIN
	CREATE TABLE [dbo].[UserType](
		[UserTypeId] [uniqueidentifier] NOT NULL CONSTRAINT DF_UserTypeId DEFAULT newsequentialid(),
		[Name] [nvarchar](255) NOT NULL,
		CONSTRAINT [PK_UserType] PRIMARY KEY 
		(
			[UserTypeId]
		)
	)
END

/*==============================================================*/
/* Table: UserTypeClaim                                         */
/*==============================================================*/
IF OBJECT_ID('[dbo].[UserTypeClaim]') IS NULL
BEGIN
	CREATE TABLE [dbo].[UserTypeClaim](
		[UserTypeClaimId] [uniqueidentifier] NOT NULL CONSTRAINT DF_UserTypeClaimID DEFAULT newsequentialid(),
		[ClaimId] [uniqueidentifier] NOT NULL,
		[UserTypeId] [uniqueidentifier] NOT NULL,
		CONSTRAINT [PK_UserTypeClaim] PRIMARY KEY 
		(
			[UserTypeClaimId]
		)
	)
END
GO

/*==============================================================*/
/* Table: PalyerInfo                                            */
/*==============================================================*/
IF OBJECT_ID('[dbo].[PalyerInfo]') IS NULL
BEGIN
	CREATE TABLE PalyerInfo (
	   PlayerInfoId         uniqueidentifier     not null,
	   Level                int                  not null,
	   ExpirienceAmount     float                not null,
	   CONSTRAINT PK_PALYERINFO primary key nonclustered (PlayerInfoId)
	)
END
GO

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_UserQuest_ParentUserQuest')
			AND parent_object_id = OBJECT_ID(N'UserQuest'))
BEGIN
	ALTER TABLE [dbo].[UserQuest]  WITH CHECK ADD  CONSTRAINT [FK_UserQuest_ParentUserQuest] FOREIGN KEY([ParentUserQuestId])
		REFERENCES [dbo].[UserQuest] ([UserQuestId])
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_Quest_ParentQuest')
			AND parent_object_id = OBJECT_ID(N'Quest'))
BEGIN
	ALTER TABLE [dbo].[Quest]  WITH CHECK ADD  CONSTRAINT [FK_Quest_ParentQuest] FOREIGN KEY([ParentQuestId])
		REFERENCES [dbo].[Quest] ([QuestId])
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_User_PlayerInfo')
			AND parent_object_id = OBJECT_ID(N'User'))
BEGIN
	ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_PlayerInfo] FOREIGN KEY([PlayerInfoId])
		REFERENCES [dbo].[PlayerInfo] ([PlayerInfoId])
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_Family_User')
			AND parent_object_id = OBJECT_ID(N'Family'))
BEGIN
	ALTER TABLE [dbo].[Family]  WITH CHECK ADD  CONSTRAINT [FK_Family_User] FOREIGN KEY([CreatedById])
		REFERENCES [dbo].[User] ([UserId])
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_Item_User')
			AND parent_object_id = OBJECT_ID(N'Item'))
BEGIN
	ALTER TABLE [dbo].[Item]  WITH CHECK ADD  CONSTRAINT [FK_Item_User] FOREIGN KEY([CreatedById])
		REFERENCES [dbo].[User] ([UserId])
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_Quest_User')
			AND parent_object_id = OBJECT_ID(N'Quest'))
BEGIN
	ALTER TABLE [dbo].[Quest]  WITH CHECK ADD  CONSTRAINT [FK_Quest_User] FOREIGN KEY([CreatedById])
		REFERENCES [dbo].[User] ([UserId])
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_User_Account')
			AND parent_object_id = OBJECT_ID(N'User'))
BEGIN
	ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Account] FOREIGN KEY([AccountId])
		REFERENCES [dbo].[Account] ([AccountId])
			ON UPDATE CASCADE
				ON DELETE CASCADE
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_User_UserType')
			AND parent_object_id = OBJECT_ID(N'User'))
BEGIN
	ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_UserType] FOREIGN KEY([UserTypeId])
		REFERENCES [dbo].[UserType] ([UserTypeId])
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_User_Family')
			AND parent_object_id = OBJECT_ID(N'User'))
BEGIN
	ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Family] FOREIGN KEY([FamilyId])
		REFERENCES [dbo].[Family] ([FamilyId])
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_Item_User')
			AND parent_object_id = OBJECT_ID(N'UserItem'))
BEGIN
	ALTER TABLE [dbo].[UserItem]  WITH CHECK ADD  CONSTRAINT [FK_UserItem_Item] FOREIGN KEY([ItemId])
		REFERENCES [dbo].[Item] ([ItemId])
			ON DELETE CASCADE
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_UserItem_User')
			AND parent_object_id = OBJECT_ID(N'UserItem'))
BEGIN
	ALTER TABLE [dbo].[UserItem]  WITH CHECK ADD  CONSTRAINT [FK_UserItem_User] FOREIGN KEY([UserId])
		REFERENCES [dbo].[User] ([UserId])
			ON DELETE CASCADE
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_UserQuest_Quest')
			AND parent_object_id = OBJECT_ID(N'UserQuest'))
BEGIN
	ALTER TABLE [dbo].[UserQuest]  WITH CHECK ADD  CONSTRAINT [FK_UserQuest_Quest] FOREIGN KEY([QuestId])
		REFERENCES [dbo].[Quest] ([QuestId])
			ON DELETE CASCADE
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_UserQuest_User')
			AND parent_object_id = OBJECT_ID(N'UserQuest'))
BEGIN
	ALTER TABLE [dbo].[UserQuest]  WITH CHECK ADD  CONSTRAINT [FK_UserQuest_User] FOREIGN KEY([UserId])
		REFERENCES [dbo].[User] ([UserId])
			ON DELETE CASCADE
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_UserTypeClaim_Claim')
			AND parent_object_id = OBJECT_ID(N'UserTypeClaim'))
BEGIN
	ALTER TABLE [dbo].[UserTypeClaim]  WITH CHECK ADD  CONSTRAINT [FK_UserTypeClaim_Claim] FOREIGN KEY([ClaimId])
		REFERENCES [dbo].[Claim] ([ClaimId])
END

IF NOT EXISTS (SELECT * 
	FROM sys.foreign_keys 
		WHERE object_id = OBJECT_ID(N'FK_UserTypeClaim_UserType')
			AND parent_object_id = OBJECT_ID(N'UserTypeClaim'))
BEGIN
	ALTER TABLE [dbo].[UserTypeClaim]  WITH CHECK ADD  CONSTRAINT [FK_UserTypeClaim_UserType] FOREIGN KEY([UserTypeId])
		REFERENCES [dbo].[UserType] ([UserTypeId])
END