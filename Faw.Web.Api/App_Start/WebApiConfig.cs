using System.Web.Http;
using System.Web.Http.Cors;

namespace Faw.Web.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.Filters.Add(new AuthorizeAttribute());

            // Web API routes
            config.MapHttpAttributeRoutes();
            var enableCorsAttribute = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(enableCorsAttribute);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
