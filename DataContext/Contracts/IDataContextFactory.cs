namespace DataContext.Contracts
{
    public interface IDataContextFactory
    {
        IDataContext CreateDataContext();
    }
}
