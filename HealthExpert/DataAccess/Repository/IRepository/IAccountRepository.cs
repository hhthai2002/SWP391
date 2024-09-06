using BussinessObject.Model.Authen;
using BussinessObject.Model.ModelUser;

namespace DataAccess.Repository.IRepository
{
    public interface IAccountRepository
    {
        Account Authenticate(UserLogin login);
        bool CheckAccount(string userName, string password);
        List<Account> GetListAccount();
        Account GetAccountById(Guid id);
        void AddAccount(Account account);
        void UpdateAccount(Account account);
        void DeleteAccount(Guid id);
        Guid GetAccountId(string userName);
        List<Account> GetAccountByEmail(string email);
    }
}
