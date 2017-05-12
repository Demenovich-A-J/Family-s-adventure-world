declare @UserTypeId uniqueidentifier = null
declare @ClaimId uniqueidentifier = null

---------Admin----------

select top 1 @UserTypeId = UserTypeId from UserType where Name = 'Admin'

select top 1 @ClaimId = ClaimId from Claim where Name = 'View'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

select top 1 @ClaimId = ClaimId from Claim where Name = 'Manage Achivments'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

----------------------

---------Dad------------

select top 1 @UserTypeId = UserTypeId from UserType where Name = 'Dad'

select top 1 @ClaimId = ClaimId from Claim where Name = 'View'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

select top 1 @ClaimId = ClaimId from Claim where Name = 'Manage Family'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

select top 1 @ClaimId = ClaimId from Claim where Name = 'Assign Quests'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

select top 1 @ClaimId = ClaimId from Claim where Name = 'Manage Family Quests'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

select top 1 @ClaimId = ClaimId from Claim where Name = 'Manage Member Quests'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

------------------

---------Mom------------

select top 1 @UserTypeId = UserTypeId from UserType where Name = 'Mom'

select top 1 @ClaimId = ClaimId from Claim where Name = 'View'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

select top 1 @ClaimId = ClaimId from Claim where Name = 'Manage Family'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

select top 1 @ClaimId = ClaimId from Claim where Name = 'Assign Quests'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

select top 1 @ClaimId = ClaimId from Claim where Name = 'Manage Family Quests'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

select top 1 @ClaimId = ClaimId from Claim where Name = 'Manage Member Quests'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

------------------

---------Son------------

select top 1 @UserTypeId = UserTypeId from UserType where Name = 'Son'

select top 1 @ClaimId = ClaimId from Claim where Name = 'View'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

select top 1 @ClaimId = ClaimId from Claim where Name = 'Assign Quests'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

------------------

---------Daughter------------

select top 1 @UserTypeId = UserTypeId from UserType where Name = 'Daughter'

select top 1 @ClaimId = ClaimId from Claim where Name = 'View'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

select top 1 @ClaimId = ClaimId from Claim where Name = 'Assign Quests'

exec AssignUserTypeClaim @UserTypeId, @ClaimId

------------------
