using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CubraDoze.WebAPI.Models;

namespace CubraDoze.WebAPI.Controllers
{
    public class JogadasController : ApiController
    {
        private dbA2Entities db = new dbA2Entities();

        // GET: api/Jogadas
        public IQueryable<Jogada> GetJogada()
        {
            return db.Jogada;
        }

        // GET: api/Jogadas/5
        [ResponseType(typeof(Jogada))]
        public IHttpActionResult GetJogada(int id)
        {
            Jogada jogada = db.Jogada.Find(id);
            if (jogada == null)
            {
                return NotFound();
            }

            return Ok(jogada);
        }

        // PUT: api/Jogadas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutJogada(int id, Jogada jogada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != jogada.Id)
            {
                return BadRequest();
            }

            db.Entry(jogada).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JogadaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Jogadas
        [ResponseType(typeof(Jogada))]
        public IHttpActionResult PostJogada(Jogada jogada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            jogada.DataRegistro = DateTime.UtcNow.AddHours(-3);
            db.Jogada.Add(jogada);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = jogada.Id }, jogada);
        }

        // DELETE: api/Jogadas/5
        [ResponseType(typeof(Jogada))]
        public IHttpActionResult DeleteJogada(int id)
        {
            Jogada jogada = db.Jogada.Find(id);
            if (jogada == null)
            {
                return NotFound();
            }

            db.Jogada.Remove(jogada);
            db.SaveChanges();

            return Ok(jogada);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool JogadaExists(int id)
        {
            return db.Jogada.Count(e => e.Id == id) > 0;
        }
    }
}