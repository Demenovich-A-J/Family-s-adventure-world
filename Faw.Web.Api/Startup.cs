﻿using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Faw.Web.Api.Startup))]

namespace Faw.Web.Api
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}