
import { memo, useContext, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { FlashContext } from '../FlashContext'

function FlashMessages() {
    const { flashMessage, clearFlash } = useContext(FlashContext)
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (flashMessage?.message) {
            setTimeout(() => {
                clearFlash()
                setShow(false);
            }, 1000)
            setShow(true)
        } else {
            setShow(false)
        }
    }, [flashMessage])

    return (
        <>
            <div
                style={{ zIndex: 1000 }}
                aria-live="assertive"
                className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none top-12 sm:items-start sm:p-6"
            >
                <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
                    <Transition show={show}>
                        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <CheckCircleIcon aria-hidden="true" className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">{flashMessage?.message}</p>
                                        <p className="mt-1 text-sm text-gray-500">{flashMessage?.description}</p>
                                    </div>
                                    <div className="flex flex-shrink-0 ml-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShow(false)
                                            }}
                                            className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon aria-hidden="true" className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}

export default memo(FlashMessages);