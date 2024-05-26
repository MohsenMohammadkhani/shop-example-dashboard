import React from 'react'
import Nav from '../partials/Nav'
import Footer from '../partials/Footer'
import Sidebar from '../partials/aside/Sidebar'

export default function Test() {
  return (
    <div className="wrapper">
        <Nav />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                dd
              </div>
            </div>
          </section>
        </div>
        <Footer />
    </div>
  )
}
