IF COL_LENGTH('dbo.Quest', 'ImageUrl') IS NULL
BEGIN
    alter table Quest
		add ImageUrl nvarchar(2024) null
END

IF COL_LENGTH('dbo.Family', 'Description') IS NULL
BEGIN
    alter table Family
		add [Description] nvarchar(max) null
END

IF COL_LENGTH('dbo.Family', 'Goal') IS NULL
BEGIN
    alter table Family
		add [Goal] nvarchar(256) null
END

IF COL_LENGTH('dbo.User', 'ImageUrl') IS NULL
BEGIN
    alter table [User]
		add [ImageUrl] nvarchar(256) null
END

IF COL_LENGTH('dbo.User', 'Description') IS NULL
BEGIN
    alter table [User]
		add [Description] nvarchar(max) null
END

IF COL_LENGTH('dbo.User', 'Country') IS NULL
BEGIN
    alter table [User]
		add [Country] nvarchar(256) null
END

IF COL_LENGTH('dbo.User', 'City') IS NULL
BEGIN
    alter table [User]
		add [City] nvarchar(256) null
END