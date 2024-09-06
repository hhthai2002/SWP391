using BussinessObject.Model.ModelUser;
using HealthExpertAPI.DTO.DTOAccount;

namespace HealthExpertAPI.Extension.ExAccount
{
    public static class AccountExtensions
    {
        public static AccountDTO ToAccountDTO(this Account account)
        {
            return new AccountDTO
            {
                accountId = account.accountId,
                userName = account.userName,
                password = account.password,
                email = account.email,
                phone = account.phone,
                fullName = account.fullName,
                gender = account.gender,
                birthDate = account.birthDate,
                bankNumber = account.bankNumber,
                bankName = account.bankName,
                createDate = account.createDate,
                isActive = account.isActive,
                roleId = account.roleId,
                verificationToken = account.verificationToken,
                passwordResetToken = account.passwordResetToken
            };
        }

        public static Account ToAccountRegister(this AccountRegistrationDTO accountDTO, byte[] passwordHash, byte[] passwordSalt)
        {
            return new Account
            {
                userName = accountDTO.userName,
                password = accountDTO.password,
                passwordHash = passwordHash,
                passwordSalt = passwordSalt,
                email = accountDTO.email,
                fullName = accountDTO.fullName,
                phone = accountDTO.phone,
                gender = accountDTO.gender,
                birthDate = accountDTO.birthDate,
                roleId = accountDTO.roleId,
                isActive = accountDTO.isActive
            };
        }

        public static Account ToCourseAdminRegister(this CourseAdminRegistrationDTO accountDTO, byte[] passwordHash, byte[] passwordSalt)
        {
            return new Account
            {
                userName = accountDTO.userName,
                password = accountDTO.password,
                passwordHash = passwordHash,
                passwordSalt = passwordSalt,
                email = accountDTO.email,
                fullName = accountDTO.fullName,
                phone = accountDTO.phone,
                gender = accountDTO.gender,
                birthDate = accountDTO.birthDate,
                bankNumber = accountDTO.bankNumber,
                bankName = accountDTO.bankName,
                roleId = accountDTO.roleId,
                isActive = accountDTO.isActive
            };
        }

        public static Account ToAccountLogin(this LoginDTO accountDTO, byte[] passwordHash, byte[] passwordSalt)
        {
            return new Account
            {
                userName = accountDTO.userName,
                password = accountDTO.password,
                passwordHash = passwordHash,
                passwordSalt = passwordSalt
            };
        }

        public static Account ToAccountUpdate(this AccountUpdateDTO accountDTO,Guid id, byte[] passwordHash, byte[] passwordSalt)
        {
            return new Account
            {
                accountId = id,
                userName = accountDTO.userName,
                password = accountDTO.password,
                passwordHash = passwordHash,
                passwordSalt = passwordSalt,
                email = accountDTO.email,
                phone = accountDTO.phone,
                fullName = accountDTO.fullName,
                gender = accountDTO.gender,
                birthDate = accountDTO.birthDate,
                createDate = accountDTO.createDate,
                isActive = accountDTO.isActive,
                roleId = accountDTO.roleId,
            };
        }

        public static Account ToReserPassword(this ResetPasswordDTO resetPasswordDTO, byte[] passwordHash, byte[] passwordSalt)
        {
            return new Account
            {
                passwordResetToken = resetPasswordDTO.token,
                password = resetPasswordDTO.password,
                passwordHash = passwordHash,
                passwordSalt = passwordSalt
            };
        }
        public static Account ToChangePassword(this ChangePasswordDTO changePasswordDTO, byte[] password)
        {
            return new Account
            {
                userName = changePasswordDTO.username,
                password = changePasswordDTO.oldPassword,
                passwordHash = password,
                passwordSalt = null
            };
        }
    }
}
