using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Core.Infrastructure
{
    public class SaltedHash
    {
        private const int DefaultSaltLength = 16;
        private string _hash;
        private byte[] _hashBytes;

        private HashAlgorithm _hashProvider;

        private string _salt;

        private byte[] _saltBytes;
        private int _saltLength;

        private string _unhashedData;

        private byte[] _unhashedDataBytes;

        public SaltedHash()
        {
        }

        /// <param name = "unhashedData">The UTF-8 encoded string to be salted and hashed</param>
        public SaltedHash(string unhashedData)
        {
            UnhashedData = unhashedData;
        }

        /// <param name = "hashAlgorithm">Can be any derivative of HashAlgorithm, e.g., SHA1Managed,SHA256Managed, SHA384Managed, SHA512Managed, MD5CryptoServiceProvider, etc...</param>
        /// <param name = "saltLength">Optional - Defaults to 16 - Longer salts are marginally more secure. Be careful not to exceed database field length.</param>
        public SaltedHash(HashAlgorithm hashAlgorithm, int saltLength = DefaultSaltLength)
            : this(null, hashAlgorithm, saltLength)
        {
        }

        /// <param name = "unhashedData">The UTF-8 encoded string to be salted and hashed</param>
        /// <param name = "hashAlgorithm">Optional - Can be any derivative of HashAlgorithm, e.g., SHA1Managed,SHA256Managed, SHA384Managed,
        ///     SHA512Managed, MD5CryptoServiceProvider, etc... - Defaults to SAH512Managed.</param>
        /// <param name = "saltLength">Optional - Longer salts are marginally more secure. Be careful not to exceed database field length. Defaults to 16.</param>
        public SaltedHash(string unhashedData, HashAlgorithm hashAlgorithm = null, int saltLength = DefaultSaltLength)
        {
            UnhashedData = unhashedData;
            HashProvider = hashAlgorithm ?? DefaultHashProvider();
            SaltLength = saltLength;
        }

        private HashAlgorithm HashProvider
        {
            get { return _hashProvider ?? (_hashProvider = DefaultHashProvider()); }
            set { _hashProvider = value; }
        }

        private int SaltLength
        {
            get
            {
                if (_saltLength < 4)
                {
                    _saltLength = 4;
                }

                return _saltLength;
            }

            set { _saltLength = value; }
        }

        public string Salt
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_salt))
                {
                    _salt = Convert.ToBase64String(SaltBytes);
                }

                return _salt;
            }

            set
            {
                _salt = value;
                _saltBytes = value == null ? null : Convert.FromBase64String(value);
            }
        }

        public byte[] SaltBytes => _saltBytes ?? (_saltBytes = GenerateRandomSalt());

        public string Hash
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_hash))
                {
                    _hash = Convert.ToBase64String(HashBytes);
                }

                return _hash;
            }

            set
            {
                _hash = value;
                _hashBytes = value == null ? null : Convert.FromBase64String(value);
            }
        }

        public byte[] HashBytes => _hashBytes ?? (_hashBytes = ComputeSaltedHash(UnhashedDataBytes, SaltBytes, HashProvider));

        private string UnhashedData
        {
            get { return _unhashedData; }
            set
            {
                _unhashedData = value;
                _unhashedDataBytes = value == null ? null : Encoding.UTF8.GetBytes(UnhashedData);
            }
        }

        private byte[] UnhashedDataBytes => _unhashedDataBytes;

        private static HashAlgorithm DefaultHashProvider()
        {
            return new SHA512Managed();
        }

        private static byte[] ComputeSaltedHash(byte[] data, byte[] saltBytes, HashAlgorithm hashProvider)
        {
            var saltedData = new byte[data.Length + saltBytes.Length];

            // Copy both the data and salt into the new array
            Array.Copy(data, saltedData, data.Length);
            Array.Copy(saltBytes, 0, saltedData, data.Length, saltBytes.Length);

            return hashProvider.ComputeHash(saltedData);
        }

        private byte[] GenerateRandomSalt()
        {
            var salt = new byte[SaltLength];

            var cryptographicRandomNumberProvider = new RNGCryptoServiceProvider();

            cryptographicRandomNumberProvider.GetNonZeroBytes(salt);

            return salt;
        }


        /// <summary>
        ///     Verifies the data against a supplied saltedHash
        /// </summary>
        /// <param name = "unhashedDataBytes">The data to verify </param>
        /// <param name = "suppliedHashBytes">The hash we had stored previously</param>
        /// <param name = "suppliedSaltBytes">The salt we had stored previously</param>
        /// <param name = "hashProvider">Optional - an instance of HashAlgorithm to use when calculating hashes for comparison </param>
        /// <returns>True on a succesfull match</returns>
        private static bool Verify(byte[] unhashedDataBytes, byte[] suppliedHashBytes, byte[] suppliedSaltBytes, HashAlgorithm hashProvider = null)
        {
            if (hashProvider == null)
            {
                hashProvider = DefaultHashProvider();
            }

            var computedHash = ComputeSaltedHash(unhashedDataBytes, suppliedSaltBytes, hashProvider);

            if (computedHash.Length != suppliedHashBytes.Length)
            {
                return false;
            }

            return !suppliedHashBytes.Where((t, len) => t != computedHash[len]).Any();
        }

        /// <summary>
        ///     Verifies string against a supplied saltedHash
        /// </summary>
        /// <param name = "utf8EncodedData">The string to verify </param>
        /// <param name = "base64EncodedHash">The previously stored hash</param>
        /// <param name = "base64EncodedSalt">The previously stored salt</param>
        /// <param name = "hashProvider">Optional - an instance of HashAlgorithm to use when calculating hashes for comparison </param>
        /// <returns>True on a succesfull match</returns>
        public static bool Verify(string utf8EncodedData, string base64EncodedHash, string base64EncodedSalt, HashAlgorithm hashProvider = null)
        {
            return Verify(Encoding.UTF8.GetBytes(utf8EncodedData), Convert.FromBase64String(base64EncodedHash), Convert.FromBase64String(base64EncodedSalt), hashProvider);
        }

        /// <summary>
        ///     Verifies string against a supplied saltedHash
        /// </summary>
        /// <param name = "utf8EncodedData">The string to verify </param>
        /// <param name = "saltedHash">An instance of a SaltedHash with the previously stored hash and salt values</param>
        /// <returns>True on a succesfull match</returns>
        public static bool Verify(string utf8EncodedData, SaltedHash saltedHash)
        {
            return Verify(Encoding.UTF8.GetBytes(utf8EncodedData), saltedHash.HashBytes, saltedHash.SaltBytes, saltedHash.HashProvider);
        }
    }
}
