using System.Web.Http.Filters;
using System.Web.Mvc;
using Core.Infrastructure.Mvc.Jwt.Attributes;

namespace Faw.Web.Api
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterHttpFilters(HttpFilterCollection filters)
        {
            filters.Add(new JwtAuthenticationAttribute());
        }
    }
}
