using Client.Base;
using Client.Repositories.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllersWithViews();

builder.Services.AddMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromSeconds(15);

});

//builder.Services.AddControllersWithViews().AddNewtonsoftJson();
//builder.Services.AddScoped<Address>();
//builder.Services.AddScoped<AuthRepository>();
//builder.Services.AddHttpContextAccessor();

//builder.Services.AddAuthentication(auth =>
//{
//    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//}).AddJwtBearer(options =>
//{
//    options.RequireHttpsMetadata = true;
//    options.SaveToken = true;
//    options.TokenValidationParameters = new TokenValidationParameters()
//    {
//        ValidateIssuer = true,
//        ValidateAudience = false,
//        ValidIssuer = Configuration["Jwt:Issuer"],
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])),
//        ValidateLifetime = true
//        //ClockSkew = TimeSpan.Zero
//    };
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseSession();

//app.Use(async (context, next) =>
//{
//    var JWToken = context.Session.GetString("JWToken");
//    if (!string.IsNullOrEmpty(JWToken))
//    {
//        context.Request.Headers.Add("Authorization", "Bearer " + JWToken);
//    }
//    await next();
//});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

