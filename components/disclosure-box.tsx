import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

const DisclosureBox = () => {
  return (
    <div className="mx-auto w-full rounded-2xl bg-white flex flex-col gap-2 mt-20 p-2">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span className="flex-1">How it works</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-purple-500 ml-2`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 text-left">
              This tool makes use of the official{" "}
              <a
                className="text-blue-500 underline"
                href="https://members-api.parliament.uk/index.html"
              >
                Parliament Members API
              </a>
              . Using your constituency, we can find information about your MP,
              including their declared financial interests.
              <br />
              <br />
              By law, MPs are required to declare whether they make rental
              income of £10,000 or greater per year. This is what we check for.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span className="flex-1">Limitations</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-purple-500 ml-2`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 text-left">
              MPs are not legally required to declare whether they make rental
              income of below £10,000 per year. This means, even if your MP
              doesn&apos;t declare rental income, they may still be a private
              landlord on a smaller scale.
              <br />
              <br />
              MPs are responsible for declaring their own financial interests.
              While illegal, they could simply choose not to declare significant
              rental income.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span className="flex-1">
                What can I do to protect myself from private landlords?
              </span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-purple-500 ml-2`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 text-left">
              Joining a tenants or community union can be a great way of
              empowering yourself against scummy landlords. They are run by and
              for members, and organise to protect one another should their
              landlords not live up to their legal obligations.
              <br />
              <br />
              Find out more information about your local tenants union here:
              <ul>
                <li>
                  •{" "}
                  <a
                    href="https://www.livingrent.org"
                    className="text-blue-500 underline"
                  >
                    Living Rent (Scotland)
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="https://londonrentersunion.org"
                    className="text-blue-500 underline"
                  >
                    London Renters Union (London)
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="https://tenantsunion.org.uk"
                    className="text-blue-500 underline"
                  >
                    Greater Manchester Tenants Union (Manchester)
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="https://www.acorntheunion.org.uk"
                    className="text-blue-500 underline"
                  >
                    ACORN (England + Wales)
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="https://catuireland.org"
                    className="text-blue-500 underline"
                  >
                    CATU (Ireland)
                  </a>
                </li>
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default DisclosureBox;
