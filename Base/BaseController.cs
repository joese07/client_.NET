using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Client.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Client.Base
{
    public class BaseController<TEntity, TRepository, TId> : Controller
        where TEntity : class
        where TRepository : IRepository<TEntity, TId>

    {
        private readonly TRepository repository;

        public BaseController(TRepository repository)
            {

            this.repository = repository;

            }

        [HttpPost]
        public JsonResult Post(TEntity entity)
        {
            var result = repository.Post(entity);
            return Json(result);
        }
    }
}

