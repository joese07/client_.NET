using System;
using System.Text;
using Client.Base;
using Client.ViewModel;
using Newtonsoft.Json;

namespace Client.Repositories.Data
{
	public class AuthRepository : GeneralRepository<AuthRepository, string>
	{
		public AuthRepository(Address address) : base(address, "Auth/")
		{
		}

		public async Task<Object> Login(LoginVM loginVM)
		{
			Object entities = null;
			StringContent content = new StringContent(JsonConvert.SerializeObject(loginVM), Encoding.UTF8, "application/json");
			using(var response = await httpClient.PostAsync(request + "Login", content))
			{
				string apiResponse = await response.Content.ReadAsStringAsync();
				entities = JsonConvert.DeserializeObject(apiResponse);
			}

			return entities;
		}

		public async Task<JWTokenVM> Auth(LoginVM login)
		{
			JWTokenVM token = null;

			StringContent content = new StringContent(JsonConvert.SerializeObject(login), Encoding.UTF8, "application/json");
			var result = await httpClient.PostAsync(request + "Login", content);

			string apiResponse = await result.Content.ReadAsStringAsync();
			token = JsonConvert.DeserializeObject<JWTokenVM>(apiResponse);

			return token;
				
		}
	}
}

