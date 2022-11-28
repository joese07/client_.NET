using System;
namespace Client.Repositories.Interface
{
	public interface IRepository<T, X>
		where T : class
	{
		Task<Object> Post(T Entity);
	}
}

