/*==============================================================*/
/* Table: Account                                               */
/*==============================================================*/
IF OBJECT_ID('[dbo].[Account]') IS NULL
BEGIN
	CREATE TABLE [dbo].[Account](
		[AccountId] [uniqueidentifier] NOT NULL,
		[UserName] [nvarchar](100) NOT NULL,
		[PasswordHash] [nvarchar](100) NOT NULL,
		[PasswordSalt] [nvarchar](100) NOT NULL,
		[Token] [uniqueidentifier] NULL,
		[Email] [nvarchar](255) NOT NULL,
		[VerifiedOn] [datetime] NULL,
	 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
	(
		[AccountId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
END

/*==============================================================*/
/* Table: Claim                                                 */
/*==============================================================*/
IF OBJECT_ID('[dbo].[Claim]') IS NULL
BEGIN
	CREATE TABLE [dbo].[Claim](
		[ClaimId] [uniqueidentifier] NOT NULL,
		[Name] [nvarchar](255) NOT NULL,
		[Description] [nvarchar](255) NOT NULL,
	 CONSTRAINT [PK_Claim] PRIMARY KEY CLUSTERED 
	(
		[ClaimId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
END

/*==============================================================*/
/* Table: Family                                                */
/*==============================================================*/
IF OBJECT_ID('[dbo].[Family]') IS NULL
BEGIN
	CREATE TABLE [dbo].[Family](
		[FamilyId] [uniqueidentifier] NOT NULL,
		[Name] [nvarchar](100) NOT NULL,
		[CreatedOn] [timestamp] NOT NULL,
		[UpdatedOn] [datetime] NOT NULL,
		[CreatedById] [uniqueidentifier] NOT NULL,
	 CONSTRAINT [PK_Family] PRIMARY KEY CLUSTERED 
	(
		[FamilyId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
END

/*==============================================================*/
/* Table: Item                                                  */
/*==============================================================*/
IF OBJECT_ID('[dbo].[Item]') IS NULL
BEGIN
	CREATE TABLE [dbo].[Item](
		[ItemId] [uniqueidentifier] NOT NULL,
		[Name] [nvarchar](300) NOT NULL,
		[Description] [nvarchar](max) NOT NULL,
		[ImagePath] [nvarchar](255) NULL,
		[SiteUrl] [nvarchar](max) NOT NULL,
		[Cost] [decimal](9, 4) NOT NULL,
		[CreatedBy] [uniqueidentifier] NULL,
	 CONSTRAINT [PK_Item] PRIMARY KEY CLUSTERED 
	(
		[ItemId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END

/*==============================================================*/
/* Table: Quest                                                 */
/*==============================================================*/
IF OBJECT_ID('[dbo].[Quest]') IS NULL
BEGIN
	CREATE TABLE [dbo].[Quest](
		[QuestId] [uniqueidentifier] NOT NULL,
		[Name] [nvarchar](255) NOT NULL,
		[Description] [nvarchar](max) NOT NULL,
		[ParentQuestId] [uniqueidentifier] NULL,
		[CreatedById] [uniqueidentifier] NOT NULL,
		[IsPublic] [bit] NOT NULL,
		[Expirience] [int] NOT NULL,
		[Coins] [decimal](10, 2) NOT NULL,
		[RequiredLVL] [int] NOT NULL,
	 CONSTRAINT [PK_Quest] PRIMARY KEY CLUSTERED 
	(
		[QuestId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END

/*==============================================================*/
/* Table: Seetting                                              */
/*==============================================================*/
IF OBJECT_ID('[dbo].[Seetting]') IS NULL
BEGIN
	CREATE TABLE [dbo].[Seetting](
		[SettingId] [uniqueidentifier] NOT NULL,
		[Name] [nvarchar](100) NOT NULL,
		[Value] [nvarchar](100) NOT NULL,
	 CONSTRAINT [PK_Seetting] PRIMARY KEY CLUSTERED 
	(
		[SettingId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
END

/*==============================================================*/
/* Table: User                                                  */
/*==============================================================*/
IF OBJECT_ID('[dbo].[User]') IS NULL
BEGIN
	CREATE TABLE [dbo].[User](
		[UserId] [uniqueidentifier] NOT NULL,
		[Email] [nvarchar](255) NOT NULL,
		[FirstName] [nvarchar](255) NOT NULL,
		[LastName] [nvarchar](255) NOT NULL,
		[AccountId] [uniqueidentifier] NOT NULL,
		[UserTypeId] [uniqueidentifier] NOT NULL,
		[Gender] [nvarchar](50) NOT NULL,
		[BirthDate] [date] NOT NULL,
	 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
	(
		[UserId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
END

/*==============================================================*/
/* Table: UserFamily                                            */
/*==============================================================*/
IF OBJECT_ID('[dbo].[UserFamily]') IS NULL
BEGIN
	CREATE TABLE [dbo].[UserFamily](
		[UserFamilyId] [uniqueidentifier] NOT NULL,
		[UserId] [uniqueidentifier] NOT NULL,
		[FamilyId] [uniqueidentifier] NOT NULL,
	 CONSTRAINT [PK_UserFamily] PRIMARY KEY CLUSTERED 
	(
		[UserFamilyId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
END

/*==============================================================*/
/* Table: UserItem                                                 */
/*==============================================================*/
IF OBJECT_ID('[dbo].[UserItem]') IS NULL
BEGIN
	CREATE TABLE [dbo].[UserItem](
		[UserItemId] [uniqueidentifier] NOT NULL,
		[UserId] [uniqueidentifier] NOT NULL,
		[ItemId] [uniqueidentifier] NOT NULL,
	 CONSTRAINT [PK_UserItem] PRIMARY KEY CLUSTERED 
	(
		[UserItemId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
END

/*==============================================================*/
/* Table: UserQuest                                             */
/*==============================================================*/
IF OBJECT_ID('[dbo].[UserQuest]') IS NULL
BEGIN
	CREATE TABLE [dbo].[UserQuest](
		[UserQuestId] [uniqueidentifier] NOT NULL,
		[UserId] [uniqueidentifier] NOT NULL,
		[QuestId] [uniqueidentifier] NOT NULL,
	 CONSTRAINT [PK_UserQuest] PRIMARY KEY CLUSTERED 
	(
		[UserQuestId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
END

/*==============================================================*/
/* Table: UserType                                              */
/*==============================================================*/
IF OBJECT_ID('[dbo].[UserType]') IS NULL
BEGIN
	CREATE TABLE [dbo].[UserType](
		[UserTypeId] [uniqueidentifier] NOT NULL,
		[Name] [nvarchar](255) NOT NULL,
	 CONSTRAINT [PK_UserType] PRIMARY KEY CLUSTERED 
	(
		[UserTypeId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
END

/*==============================================================*/
/* Table: UserTypeClaim                                         */
/*==============================================================*/
IF OBJECT_ID('[dbo].[UserTypeClaim]') IS NULL
BEGIN
	CREATE TABLE [dbo].[UserTypeClaim](
		[UserTypeClaimId] [uniqueidentifier] NOT NULL,
		[ClaimId] [uniqueidentifier] NOT NULL,
		[UserTypeId] [uniqueidentifier] NOT NULL,
	 CONSTRAINT [PK_UserTypeClaim] PRIMARY KEY CLUSTERED 
	(
		[UserTypeClaimId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
END
GO

IF OBJECT_ID('[FK_Family_User]') IS NULL
BEGIN
	ALTER TABLE [dbo].[Family]  WITH CHECK ADD  CONSTRAINT [FK_Family_User] FOREIGN KEY([CreatedById])
		REFERENCES [dbo].[User] ([UserId])

	ALTER TABLE [dbo].[Family] CHECK CONSTRAINT [FK_Family_User]
END

IF OBJECT_ID('[FK_Item_User]') IS NULL
BEGIN
	ALTER TABLE [dbo].[Item]  WITH CHECK ADD  CONSTRAINT [FK_Item_User] FOREIGN KEY([CreatedBy])
		REFERENCES [dbo].[User] ([UserId])

	ALTER TABLE [dbo].[Item] CHECK CONSTRAINT [FK_Item_User]
END

IF OBJECT_ID('[FK_Quest_User]') IS NULL
BEGIN
	ALTER TABLE [dbo].[Quest]  WITH CHECK ADD  CONSTRAINT [FK_Quest_User] FOREIGN KEY([CreatedById])
		REFERENCES [dbo].[User] ([UserId])
	
	ALTER TABLE [dbo].[Quest] CHECK CONSTRAINT [FK_Quest_User]
END

IF OBJECT_ID('[FK_User_Account]') IS NULL
BEGIN
	ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Account] FOREIGN KEY([AccountId])
		REFERENCES [dbo].[Account] ([AccountId])
			ON UPDATE CASCADE
				ON DELETE CASCADE
	ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Account]
END

IF OBJECT_ID('[FK_User_UserType]') IS NULL
BEGIN
	ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_UserType] FOREIGN KEY([UserTypeId])
		REFERENCES [dbo].[UserType] ([UserTypeId])

	ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_UserType]
END

IF OBJECT_ID('[FK_UserFamily_Family]') IS NULL
BEGIN
	ALTER TABLE [dbo].[UserFamily]  WITH CHECK ADD  CONSTRAINT [FK_UserFamily_Family] FOREIGN KEY([FamilyId])
		REFERENCES [dbo].[Family] ([FamilyId])

	ALTER TABLE [dbo].[UserFamily] CHECK CONSTRAINT [FK_UserFamily_Family]
END

IF OBJECT_ID('[FK_UserFamily_User]') IS NULL
BEGIN
	ALTER TABLE [dbo].[UserFamily]  WITH CHECK ADD  CONSTRAINT [FK_UserFamily_User] FOREIGN KEY([UserId])
		REFERENCES [dbo].[User] ([UserId])
	
	ALTER TABLE [dbo].[UserFamily] CHECK CONSTRAINT [FK_UserFamily_User]
END

IF OBJECT_ID('[FK_Item_User]') IS NULL
BEGIN
	ALTER TABLE [dbo].[UserItem]  WITH CHECK ADD  CONSTRAINT [FK_UserItem_Item] FOREIGN KEY([ItemId])
		REFERENCES [dbo].[Item] ([ItemId])
			ON DELETE CASCADE

	ALTER TABLE [dbo].[UserItem] CHECK CONSTRAINT [FK_UserItem_Item]
END

IF OBJECT_ID('[FK_Item_User]') IS NULL
BEGIN
	ALTER TABLE [dbo].[UserItem]  WITH CHECK ADD  CONSTRAINT [FK_UserItem_User] FOREIGN KEY([UserId])
		REFERENCES [dbo].[User] ([UserId])
			ON DELETE CASCADE

	ALTER TABLE [dbo].[UserItem] CHECK CONSTRAINT [FK_UserItem_User]
END

IF OBJECT_ID('[FK_UserQuest_Quest]') IS NULL
BEGIN
	ALTER TABLE [dbo].[UserQuest]  WITH CHECK ADD  CONSTRAINT [FK_UserQuest_Quest] FOREIGN KEY([QuestId])
		REFERENCES [dbo].[Quest] ([QuestId])
			ON DELETE CASCADE

	ALTER TABLE [dbo].[UserQuest] CHECK CONSTRAINT [FK_UserQuest_Quest]
END

IF OBJECT_ID('[FK_UserQuest_User]') IS NULL
BEGIN
	ALTER TABLE [dbo].[UserQuest]  WITH CHECK ADD  CONSTRAINT [FK_UserQuest_User] FOREIGN KEY([UserId])
		REFERENCES [dbo].[User] ([UserId])
			ON DELETE CASCADE

	ALTER TABLE [dbo].[UserQuest] CHECK CONSTRAINT [FK_UserQuest_User]
END

IF OBJECT_ID('[FK_UserTypeClaim_Claim]') IS NULL
BEGIN
	ALTER TABLE [dbo].[UserTypeClaim]  WITH CHECK ADD  CONSTRAINT [FK_UserTypeClaim_Claim] FOREIGN KEY([ClaimId])
		REFERENCES [dbo].[Claim] ([ClaimId])

	ALTER TABLE [dbo].[UserTypeClaim] CHECK CONSTRAINT [FK_UserTypeClaim_Claim]
END

IF OBJECT_ID('[FK_UserTypeClaim_UserType]') IS NULL
BEGIN
	ALTER TABLE [dbo].[UserTypeClaim]  WITH CHECK ADD  CONSTRAINT [FK_UserTypeClaim_UserType] FOREIGN KEY([UserTypeId])
		REFERENCES [dbo].[UserType] ([UserTypeId])

	ALTER TABLE [dbo].[UserTypeClaim] CHECK CONSTRAINT [FK_UserTypeClaim_UserType]
END