using System;
using System.Text;
using Client.Base;
using Client.Repositories.Interface;
using Newtonsoft.Json;

namespace Client.Repositories
{
	public class GeneralRepository<TEntity, TId> : IRepository<TEntity, TId>
		where TEntity : class
	{
		public readonly Address address;

		public readonly string request;

		public readonly IHttpContextAccessor contextAccessor;

		public readonly HttpClient httpClient;

		public GeneralRepository(Address address, string request)
		{
			this.address = address;
			this.request = request;
			contextAccessor = new HttpContextAccessor();
			httpClient = new HttpClient
			{
				BaseAddress = new Uri(address.link)
			};
			httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("bearer", contextAccessor.HttpContext.Session.GetString("JWToken"));
		}

        public async Task<Object> Post(TEntity entity)
        {
			StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
			using(var result = httpClient.PostAsync(address.link + request, content).Result)
			{
				string apiResponse = await result.Content.ReadAsStringAsync();
				entity = JsonConvert.DeserializeObject<TEntity>(apiResponse);
			}
			return entity;
        }
    }
}

