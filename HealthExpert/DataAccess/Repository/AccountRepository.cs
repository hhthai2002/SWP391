using BussinessObject.Model.Authen;
using BussinessObject.Model.ModelUser;
using DataAccess.DAO;
using DataAccess.Repository.IRepository;

namespace DataAccess.Repository
{
    public class AccountRepository : IAccountRepository
    {
        public Account Authenticate(UserLogin login) => AccountDAO.Authenticate(login);

        public bool CheckAccount(string userName, string password) => AccountDAO.CheckAccount(userName, password);

        public List<Account> GetListAccount() => AccountDAO.GetListAccount();

        public Account GetAccountById(Guid id) => AccountDAO.GetAccountById(id);

        public void UpdateAccount(Account account) => AccountDAO.UpdateAccount(account);

        public void DeleteAccount(Guid id)  => AccountDAO.DeleteAccount(id);

        public void AddAccount(Account account) => AccountDAO.AddAccount(account);

        public Guid GetAccountId(string userName)
        {
            return AccountDAO.GetAccountId(userName);
        }

        public List<Account> GetAccountByEmail(string email)
        {
            return AccountDAO.GetAccountByEmail(email);
        }
    }
}
