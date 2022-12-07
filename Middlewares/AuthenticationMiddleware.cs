using System;
namespace Client.Middlewares
{
	public class AuthenticationMiddleware
	{
		private readonly RequestDelegate _next;
		public AuthenticationMiddleware(RequestDelegate next)
		{
			_next = next;
		}

		public Task Invoke(HttpContext httpContext)
		{
			var path = httpContext.Request.Path;
			if(path.HasValue && path.Value.StartsWith("/admin"))
			{
				if(httpContext.Session.GetString("key")== null)
				{
					httpContext.Response.Redirect("/login/index");
				}
			}
			return _next(httpContext);
		}
	}

	public static class AuthenticateMiddlewareExtensions
	{
		public static IApplicationBuilder UseAuthenticationMiddleware(this IApplicationBuilder builder)
		{
			return builder.UseMiddleware<AuthenticationMiddleware>();
		}
	}
}

