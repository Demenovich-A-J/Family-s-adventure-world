namespace Core.DataContext.Contracts
{
    public interface IDataContextFactory
    {
        IDataContext CreateDataContext();
    }
}
