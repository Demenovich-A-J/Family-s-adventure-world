using System;
using Faw.Services.Models;

namespace Faw.Services.Contracts.DataManagement
{
    public interface IUserService
    {
        /// <summary>
        /// Create new user in system.
        /// </summary>
        /// <param name="user">User to registrate.</param>
        /// <returns>Returns verify token.</returns>
        Guid Register(User user);
        UserVerifyResult Verify(Guid token);
        bool Authenticate(string emailOrlogin, string password);
        void Edit(User user);
    }

    public enum UserVerifyResult
    {
        Ok,
        TokenExpired,
        TokenChanged,
        AlreadyVerified
    }
}