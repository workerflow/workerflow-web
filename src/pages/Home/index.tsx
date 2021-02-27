import { Fragment } from 'react';
// import { Link } from 'react-router-dom';

import { AiOutlineMore } from "react-icons/ai";
import { IconType } from "react-icons";

import Menu from "../../components/menu";
import Header from "../../components/header";

import ContextMenu from "./ContextMenu";

export default function Home() {
  return (
    <Fragment>
      <div className="h-screen flex overflow-hidden bg-white">
        <Menu />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex={0}>
            <Header title="Home" />
            <div className="hidden mt-8 sm:block">
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



                    <tr>
                      <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center space-x-3 lg:pl-2">
                          <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600"></div>
                          <a href="#" className="truncate hover:text-gray-600">
                            <span>GraphQL API
                              <span className="text-gray-500 font-normal">in Engineering</span>
                            </span>
                          </a>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                        March 17, 2020
                      </td>
                      <td className="pr-6">
                        <div className="relative flex justify-end items-center">
                          <button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            <span className="sr-only">Open options</span>
                            <AiOutlineMore className="w-5 h-5" />
                          </button>



                          <ContextMenu show={false} />


                        </div>
                      </td>
                    </tr>



                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>

    </Fragment >
  )
}
