import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import Menu from "../../components/Menu1";
import Header from "../../components/Header1";
import Footer from "../../components/Footer1";

import TableItem from "./TableItem";

import IProject from "../../interfaces/IProject"

export default function Home() {
  let [projectList, setProjectList] = useState<IProject[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/projects')
      .then((response) => {
        if (response.status === 200) {
          setProjectList(response.data as IProject[]);
        }
      });
  }, []);

  return (
    <Fragment>
      <div className="h-screen flex overflow-hidden bg-white">
        <Menu />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex={0}>
            <Header title="Home" />
            <div className="hidden mt-1 sm:block">
              <div className="align-middle inline-block min-w-full border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-t border-gray-200">
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <span className="lg:pl-2">Workflow</span>
                      </th>
                      <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last updated
                      </th>
                      <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {
                      projectList.map(m => {
                        return (
                          <TableItem key={m.name} name={m.name} description={m.description} updated={m.updated} />
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </Fragment >
  )
}
