import React, { Children, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import { PlusIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons"; // Example icons

const mockUsers = [
  {
    id: "user-1",
    orgId: "org-1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.d@rapidroute.com",
    phone: "+33612345678",
    role: "driver",
    isActive: true,
  },
  {
    id: "user-2",
    orgId: "org-1",
    firstName: "Marie",
    lastName: "Curie",
    email: "marie.c@rapidroute.com",
    phone: "+33687654321",
    role: "dispatcher",
    isActive: true,
  },
  {
    id: "user-3",
    orgId: "org-2",
    firstName: "Pierre",
    lastName: "Martin",
    email: "pierre.m@citydash.com",
    phone: "+33711223344",
    role: "driver",
    isActive: true,
  },
  {
    id: "user-4",
    orgId: "org-3",
    firstName: "Sophie",
    lastName: "Lefevre",
    email: "sophie.l@expressgo.com",
    phone: "+33655667788",
    role: "admin",
    isActive: true,
  },
];

const mockVehicles = [
  {
    id: "veh-1",
    orgId: "org-1",
    plate: "AB-123-CD",
    make: "Renault",
    model: "Kangoo",
    type: "van",
    capacityVolume: 3.5,
    capacityWeight: 750,
    isActive: true,
  },
  {
    id: "veh-2",
    orgId: "org-1",
    plate: "EF-456-GH",
    make: "Peugeot",
    model: "Partner",
    type: "van",
    capacityVolume: 3.0,
    capacityWeight: 600,
    isActive: true,
  },
  {
    id: "veh-3",
    orgId: "org-2",
    plate: "IJ-789-KL",
    make: "Yamaha",
    model: "NMAX",
    type: "motorcycle",
    capacityVolume: 0.1,
    capacityWeight: 10,
    isActive: true,
  },
];

const mockOrders = [
  {
    id: "ord-1",
    orgId: "org-1",
    tracking: "RR12345",
    status: "delivered",
    pickup: "10 Rue de la Paix, Paris",
    delivery: "20 Av. des Champs-Élysées, Paris",
    recipient: "Mme Dubois",
    weight: 2.5,
    volume: 0.05,
  },
  {
    id: "ord-2",
    orgId: "org-1",
    tracking: "RR12346",
    status: "assigned",
    pickup: "5 Bd Haussmann, Paris",
    delivery: "15 Rue St-Honoré, Paris",
    recipient: "M. Bernard",
    weight: 1.0,
    volume: 0.02,
  },
  {
    id: "ord-3",
    orgId: "org-2",
    tracking: "CD98765",
    status: "pending",
    pickup: "30 Rue de Rivoli, Paris",
    delivery: "50 Quai Anatole France, Paris",
    recipient: "Mme Petit",
    weight: 5.0,
    volume: 0.1,
  },
];

const mockAssignments = [
  {
    id: "assign-1",
    orderId: "ord-1",
    driverId: "user-1",
    vehicleId: "veh-1",
    status: "completed",
    assignmentTime: "2024-05-20T10:00:00Z",
  },
  {
    id: "assign-2",
    orderId: "ord-2",
    driverId: "user-1",
    vehicleId: "veh-1",
    status: "assigned",
    assignmentTime: "2024-05-21T14:30:00Z",
  },
  {
    id: "assign-3",
    orderId: "ord-3",
    driverId: "user-3",
    vehicleId: "veh-3",
    status: "assigned",
    assignmentTime: "2024-05-21T16:00:00Z",
  },
];

// Helper for a simple "table" using Tailwind flex/grid
const TableRow = ({ children }) => (
  <div
    className={`grid grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-${
      Children.count(children) - 1
    } gap-4 py-2 border-b border-gray-200 last:border-b-0`}
  >
    {children}
  </div>
);

const TableHeader = ({ children, columns = 6 }) => (
  <div
    className={`grid grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-${
      Children.count(children) - 1
    } gap-4 py-2 font-semibold text-gray-700 border-b-2 border-gray-300`}
  >
    {children}
  </div>
);

function Welcome() {
  const [activeTab, setActiveTab] = useState("users");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenWaze = (order) => {
    const origin = encodeURIComponent(order.pickup);
    const destination = encodeURIComponent(order.delivery);

    const wazeUrl = `https://waze.com/ul?q=${destination}&navigate=yes&from_place=${origin}`;

    window.open(wazeUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">Sharyo Admin</h1>
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2"
            onClick={() => setIsDialogOpen(true)}
          >
            <PlusIcon />
            <span>Ajouter Nouveau</span>
          </button>
          <GearIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
          <ExitIcon className="h-6 w-6 text-red-500 cursor-pointer" />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white shadow-md p-4 pt-8">
          <Tabs.Root
            className="flex flex-col space-y-2"
            value={activeTab}
            onValueChange={setActiveTab}
            orientation="vertical"
          >
            <Tabs.List className="flex flex-col space-y-2">
              <Tabs.Trigger
                value="users"
                className="px-4 py-2 text-left rounded-md data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Utilisateurs
              </Tabs.Trigger>
              <Tabs.Trigger
                value="vehicles"
                className="px-4 py-2 text-left rounded-md data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Véhicules
              </Tabs.Trigger>
              <Tabs.Trigger
                value="orders"
                className="px-4 py-2 text-left rounded-md data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Commandes
              </Tabs.Trigger>
              <Tabs.Trigger
                value="assignments"
                className="px-4 py-2 text-left rounded-md data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Affectations
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </div>

        {/* Content Panels */}
        <div className="flex-1 p-6">
          <Tabs.Root value={activeTab} className="w-full">
            <Tabs.Content
              value="users"
              className="bg-white p-6 rounded-lg shadow"
            >
              <h2 className="text-xl font-semibold mb-4">Utilisateurs</h2>
              <TableHeader>
                <div>ID</div>
                <div>Nom</div>
                <div>Email</div>
                <div>Téléphone</div>
                <div>Rôle</div>
                <div>Actif</div>
              </TableHeader>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <div>{user.id}</div>
                  <div>
                    {user.firstName} {user.lastName}
                  </div>
                  <div>{user.email}</div>
                  <div>{user.phone}</div>
                  <div>{user.role}</div>
                  <div>{user.isActive ? "Oui" : "Non"}</div>
                </TableRow>
              ))}
            </Tabs.Content>

            <Tabs.Content
              value="vehicles"
              className="bg-white p-6 rounded-lg shadow"
            >
              <h2 className="text-xl font-semibold mb-4">Véhicules</h2>
              <TableHeader>
                <div>ID</div>
                <div>Plaque</div>
                <div>Marque/Modèle</div>
                <div>Type</div>
                <div>Capacité (m³/kg)</div>
                <div>Actif</div>
              </TableHeader>
              {mockVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <div>{vehicle.id}</div>
                  <div>{vehicle.plate}</div>
                  <div>
                    {vehicle.make} {vehicle.model}
                  </div>
                  <div>{vehicle.type}</div>
                  <div>
                    {vehicle.capacityVolume}/{vehicle.capacityWeight}
                  </div>
                  <div>{vehicle.isActive ? "Oui" : "Non"}</div>
                </TableRow>
              ))}
            </Tabs.Content>

            <Tabs.Content
              value="orders"
              className="bg-white p-6 rounded-lg shadow"
            >
              <h2 className="text-xl font-semibold mb-4">Commandes</h2>
              <TableHeader>
                <div>ID</div>
                <div>Suivi</div>
                <div>Statut</div>
                <div>Ramassage</div>
                <div>Livraison</div>
                <div>Destinataire</div>
                <div>Actions</div>
              </TableHeader>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <div>{order.id}</div>
                  <div>{order.tracking}</div>
                  <div>{order.status}</div>
                  <div>{order.pickup}</div>
                  <div>{order.delivery}</div>
                  <div>{order.recipient}</div>
                  <button
                    className="px-2 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center space-x-1"
                    onClick={() => handleOpenWaze(order)}
                  >
                    🗺️ Waze
                  </button>
                </TableRow>
              ))}
            </Tabs.Content>

            <Tabs.Content
              value="assignments"
              className="bg-white p-6 rounded-lg shadow"
            >
              <h2 className="text-xl font-semibold mb-4">Affectations</h2>
              <TableHeader>
                <div>ID</div>
                <div>ID Commande</div>
                <div>ID Coursier</div>
                <div>ID Véhicule</div>
                <div>Statut</div>
                <div>Heure</div>
              </TableHeader>
              {mockAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <div>{assignment.id}</div>
                  <div>{assignment.orderId}</div>
                  <div>{assignment.driverId}</div>
                  <div>{assignment.vehicleId || "N/A"}</div>
                  <div>{assignment.status}</div>
                  <div>
                    {new Date(assignment.assignmentTime).toLocaleString()}
                  </div>
                </TableRow>
              ))}
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>

      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 fixed inset-0" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-[500px]">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Ajouter un nouvel élément
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 mb-6">
              Ceci est un espace réservé pour ajouter une nouvelle organisation,
              un utilisateur, un véhicule, etc.
            </Dialog.Description>
            <div className="flex justify-end gap-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                onClick={() => setIsDialogOpen(false)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => setIsDialogOpen(false)}
              >
                Enregistrer
              </button>
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Fermer"
              >
                &times;
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export { Welcome };
