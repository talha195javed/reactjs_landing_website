import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option
} from "@material-tailwind/react";
import {
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  StarIcon,
  BoltIcon,
  ShieldCheckIcon,
  CogIcon,
  BellIcon,
  CalendarIcon,
  CreditCardIcon,
  ArrowRightIcon,
  ChartBarIcon,
  UsersIcon,
  GlobeAltIcon,
  FingerPrintIcon,
  ServerIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline";
import { PageTitle, Footer } from "@/widgets/layout";
import { motion } from "framer-motion";

export default function RecordPage() {
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showNewPackageForm, setShowNewPackageForm] = useState(false);
  const [newPackageData, setNewPackageData] = useState({
    type: '',
    duration: '',
    paymentMethod: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get data from localStorage
        const storedClientUser = localStorage.getItem("clientUser");
        if (storedClientUser) {
          const parsedData = JSON.parse(storedClientUser);

          // Transform the data to match the expected structure
          const transformedData = {
            client: {
              id: parsedData.user.id,
              name: parsedData.user.name,
              email: parsedData.user.email,
              phone: parsedData.user.phone,
              company: parsedData.user.company,
              created_at: parsedData.subscriptions.length > 0
                  ? parsedData.subscriptions[0].created_at
                  : new Date().toISOString()
            },
            packages: parsedData.subscriptions.map(sub => ({
              id: sub.id,
              package_type: sub.package_type,
              billing_cycle: sub.billing_cycle,
              amount: sub.amount,
              currency: sub.currency,
              status: sub.status,
              start_date: sub.start_date,
              end_date: sub.end_date,
              payment_intent_id: sub.payment_intent_id
            }))
          };

          setClientData(transformedData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error parsing client data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenDialog = (pkg) => {
    setSelectedPackage(pkg);
    setOpenDialog(true);
  };

  const handleNewPackageChange = (field, value) => {
    setNewPackageData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewPackageSubmit = () => {
    console.log("New package data:", newPackageData);
    window.location.href = `/AboutPackage?type=${newPackageData.type}`;
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-white">
          <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <CogIcon className="h-12 w-12 text-blue-500" />
          </motion.div>
        </div>
    );
  }

  if (!clientData) {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-white p-6 text-center">
          <XCircleIcon className="h-16 w-16 text-red-500 mb-4" />
          <Typography variant="h4" color="red" className="mb-2">
            No Client Data Found
          </Typography>
          <Typography className="mb-6 max-w-md">
            We couldn't retrieve your account information. Please try again later.
          </Typography>
          <Button color="blue" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
    );
  }

  const { client, packages } = clientData;

  const packageFeatures = {
    basic: [
      { icon: <UsersIcon className="h-5 w-5" />, text: "Up to 50 monthly visitors" },
      { icon: <BellIcon className="h-5 w-5" />, text: "Email notifications" },
      { icon: <ChartBarIcon className="h-5 w-5" />, text: "Basic reporting" },
      { icon: <GlobeAltIcon className="h-5 w-5" />, text: "Single location" }
    ],
    professional: [
      { icon: <UsersIcon className="h-5 w-5" />, text: "Up to 200 monthly visitors" },
      { icon: <BellIcon className="h-5 w-5" />, text: "SMS & Email notifications" },
      { icon: <ChartBarIcon className="h-5 w-5" />, text: "Advanced reporting" },
      { icon: <GlobeAltIcon className="h-5 w-5" />, text: "Multi-location support" },
      { icon: <FingerPrintIcon className="h-5 w-5" />, text: "Custom branding" }
    ],
    enterprise: [
      { icon: <UsersIcon className="h-5 w-5" />, text: "Unlimited visitors" },
      { icon: <ServerIcon className="h-5 w-5" />, text: "Priority support" },
      { icon: <FingerPrintIcon className="h-5 w-5" />, text: "API access" },
      { icon: <ShieldCheckIcon className="h-5 w-5" />, text: "Dedicated account manager" },
      { icon: <GlobeAltIcon className="h-5 w-5" />, text: "Custom integrations" },
      { icon: <ServerIcon className="h-5 w-5" />, text: "On-premise deployment" }
    ]
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden -z-10">
          {[...Array(15)].map((_, i) => (
              <motion.div
                  key={i}
                  className="absolute rounded-full bg-blue-100 opacity-30"
                  style={{
                    width: `${Math.random() * 200 + 50}px`,
                    height: `${Math.random() * 200 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                  }}
                  transition={{
                    duration: Math.random() * 20 + 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
              />
          ))}
        </div>
<div style={{ marginTop: '9%' }}>
        <PageTitle
            section="Client Portal"
            heading={`Welcome, ${client.name}`}
            subheading="Manage your account and subscriptions"
            imgSrc="/img/ch.jpg"
        />
</div>

        <div className="container mx-auto px-4 py-12 relative">
          {/* Floating Action Button */}
          <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="fixed bottom-8 right-8 z-50"
          >
            <Button
                color="green"
                className="rounded-full p-4 shadow-xl flex items-center gap-2"
                onClick={() => (window.location.href = "/AboutPackage")}
            >
              <PlusIcon className="h-5 w-5" />
              <span>New Package</span>
            </Button>
          </motion.div>

          {/* Client Profile Section */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
          >
            <Card className="shadow-xl overflow-hidden">
              <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none relative h-48"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700" />
                <div className="relative h-full flex flex-col md:flex-row items-center px-8 justify-center md:justify-start">
                  <Avatar
                      src="/img/ch.jpg"
                      alt="Profile"
                      size="xxl"
                      className="border-4 border-white shadow-lg mb-4 md:mb-0"
                  />
                  <div className="md:ml-6 text-center md:text-left text-white">
                    <Typography variant="h3" className="mb-1">
                      {client.name}
                    </Typography>
                    <Typography variant="h6" className="font-normal">
                      {client.company || 'No company specified'}
                    </Typography>
                    <div className="flex gap-2 mt-3 justify-center md:justify-start">
                      <Chip
                          value="Verified"
                          icon={<ShieldCheckIcon className="h-4 w-4" />}
                          color="green"
                          className="rounded-full"
                      />
                      <Chip
                          value="Active"
                          icon={<CheckCircleIcon className="h-4 w-4" />}
                          color="blue"
                          className="rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="px-8 pt-8 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-white rounded-lg border border-blue-50 shadow-sm hover:shadow-md transition-shadow">
                    <Typography variant="small" color="blue-gray" className="font-medium mb-2 flex items-center gap-2">
                      <BellIcon className="h-4 w-4" />
                      Email
                    </Typography>
                    <Typography variant="h6" className="text-blue-900">
                      {client.email}
                    </Typography>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-blue-50 shadow-sm hover:shadow-md transition-shadow">
                    <Typography variant="small" color="blue-gray" className="font-medium mb-2 flex items-center gap-2">
                      <BoltIcon className="h-4 w-4" />
                      Phone
                    </Typography>
                    <Typography variant="h6" className="text-blue-900">
                      {client.phone || 'Not provided'}
                    </Typography>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-blue-50 shadow-sm hover:shadow-md transition-shadow">
                    <Typography variant="small" color="blue-gray" className="font-medium mb-2 flex items-center gap-2">
                      <StarIcon className="h-4 w-4" />
                      Member Since
                    </Typography>
                    <Typography variant="h6" className="text-blue-900">
                      {new Date(client.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Packages Section */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <Typography variant="h2" className="text-3xl font-bold text-gray-900">
                Your Subscriptions
              </Typography>
              <Button
                  color="blue"
                  variant="gradient"
                  className="flex items-center gap-2"
                  onClick={() => (window.location.href = "/AboutPackage")}
              >
                <PlusIcon className="h-4 w-4" />
                Activate New Package
              </Button>
            </div>

            {packages.length === 0 ? (
                <Card className="text-center p-12 shadow-lg border border-blue-100">
                  <div className="mx-auto w-24 h-24 mb-6 rounded-full bg-blue-50 flex items-center justify-center">
                    <BuildingOfficeIcon className="h-12 w-12 text-blue-500" />
                  </div>
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                    No Active Subscriptions
                  </Typography>
                  <Typography className="mb-6 max-w-md mx-auto text-gray-600">
                    You don't have any active subscriptions yet. Get started with one of our packages today!
                  </Typography>
                  <Button
                      color="blue"
                      size="lg"
                      className="mx-auto"
                      onClick={() => setShowNewPackageForm(true)}
                  >
                    Browse Packages
                  </Button>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {packages.map((pkg, index) => (
                      <motion.div
                          key={index}
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3 }}
                      >
                        <Card className="h-full shadow-lg border border-blue-50 overflow-hidden">
                          <CardHeader
                              floated={false}
                              shadow={false}
                              color="transparent"
                              className={`m-0 rounded-none relative h-40 ${
                                  pkg.package_type === 'basic' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                      pkg.package_type === 'professional' ? 'bg-gradient-to-r from-purple-500 to-indigo-600' :
                                          'bg-gradient-to-r from-teal-500 to-emerald-600'
                              }`}
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Typography variant="h2" color="white" className="text-4xl font-bold capitalize">
                                {pkg.package_type}
                              </Typography>
                            </div>
                            {pkg.status === 'active' && (
                                <div className="absolute top-4 right-4">
                                  <Chip
                                      value="Active"
                                      color="green"
                                      className="rounded-full"
                                  />
                                </div>
                            )}
                          </CardHeader>
                          <CardBody className="p-6">
                            <div className="flex justify-between items-center mb-4">
                              <Typography variant="h5" className="capitalize">
                                {pkg.package_type} Plan
                              </Typography>
                              <Typography variant="h5" className="font-bold">
                                {pkg.amount} {pkg.currency.toUpperCase()}
                              </Typography>
                            </div>

                            <div className="space-y-3 mb-6">
                              <div className="flex justify-between">
                                <Typography variant="small" color="gray">
                                  Billing Cycle:
                                </Typography>
                                <Typography variant="small" className="font-bold capitalize">
                                  {pkg.billing_cycle}
                                </Typography>
                              </div>

                              <div className="flex justify-between">
                                <Typography variant="small" color="gray">
                                  Started On:
                                </Typography>
                                <Typography variant="small" className="font-bold">
                                  {new Date(pkg.start_date).toLocaleDateString()}
                                </Typography>
                              </div>

                              <div className="flex justify-between">
                                <Typography variant="small" color="gray">
                                  Expires On:
                                </Typography>
                                <Typography variant="small" className="font-bold">
                                  {new Date(pkg.end_date).toLocaleDateString()}
                                </Typography>
                              </div>
                            </div>

                            <div className="flex gap-2 mt-6">
                              <Button
                                  color="blue"
                                  variant="outlined"
                                  fullWidth
                                  onClick={() => handleOpenDialog(pkg)}
                              >
                                Details
                              </Button>
                              <Button
                                  color="green"
                                  fullWidth
                                  onClick={() => window.location.href = `/AboutPackage?type=${pkg.package_type}`}
                              >
                                {pkg.status === 'active' ? 'Upgrade' : 'Renew'}
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                  ))}
                </div>
            )}
          </motion.div>
        </div>

        {/* Package Details Dialog */}
        <Dialog open={openDialog} handler={() => setOpenDialog(false)} size="lg">
          <DialogHeader className="justify-between">
            <div>
              <Typography variant="h4" color="blue-gray" className="capitalize">
                {selectedPackage?.package_type} Package Details
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Subscription ID: {selectedPackage?.id}
              </Typography>
            </div>
            <Chip
                value={selectedPackage?.status}
                color={selectedPackage?.status === 'active' ? 'green' : 'red'}
                className="rounded-full capitalize"
            />
          </DialogHeader>
          <DialogBody divider className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Subscription Information
              </Typography>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Typography variant="small" color="gray">
                    Plan Type:
                  </Typography>
                  <Typography variant="small" className="font-bold capitalize">
                    {selectedPackage?.package_type}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="small" color="gray">
                    Billing Cycle:
                  </Typography>
                  <Typography variant="small" className="font-bold capitalize">
                    {selectedPackage?.billing_cycle}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="small" color="gray">
                    Amount:
                  </Typography>
                  <Typography variant="small" className="font-bold">
                    {selectedPackage?.amount} {selectedPackage?.currency.toUpperCase()}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="small" color="gray">
                    Payment ID:
                  </Typography>
                  <Typography variant="small" className="font-bold">
                    {selectedPackage?.payment_intent_id || 'N/A'}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="small" color="gray">
                    Start Date:
                  </Typography>
                  <Typography variant="small" className="font-bold">
                    {selectedPackage?.start_date ? new Date(selectedPackage.start_date).toLocaleDateString() : 'N/A'}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="small" color="gray">
                    End Date:
                  </Typography>
                  <Typography variant="small" className="font-bold">
                    {selectedPackage?.end_date ? new Date(selectedPackage.end_date).toLocaleDateString() : 'N/A'}
                  </Typography>
                </div>
              </div>
            </div>

            <div>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Package Features
              </Typography>
              <ul className="space-y-3">
                {selectedPackage && packageFeatures[selectedPackage.package_type]?.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="p-1 bg-blue-50 rounded-full">
                        {feature.icon}
                      </div>
                      <Typography variant="small" color="blue-gray">
                        {feature.text}
                      </Typography>
                    </li>
                ))}
              </ul>
            </div>
          </DialogBody>
          <DialogFooter className="gap-2">
            <Button
                variant="outlined"
                color="blue-gray"
                onClick={() => setOpenDialog(false)}
            >
              Close
            </Button>
            <Button
                color="blue"
                onClick={() => {
                  setOpenDialog(false);
                  window.location.href = `/AboutPackage?type=${selectedPackage?.package_type}`;
                }}
            >
              {selectedPackage?.status === 'active' ? 'Upgrade Package' : 'Activate Package'}
            </Button>
          </DialogFooter>
        </Dialog>

        {/* New Package Form Dialog */}
        <Dialog open={showNewPackageForm} handler={() => setShowNewPackageForm(false)} size="md">
          <DialogHeader className="justify-between">
            <Typography variant="h4" color="blue-gray">
              Activate New Package
            </Typography>
          </DialogHeader>
          <DialogBody divider>
            <div className="space-y-6">
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Package Type
                </Typography>
                <Select
                    label="Select Package"
                    value={newPackageData.type}
                    onChange={(value) => handleNewPackageChange('type', value)}
                >
                  <Option value="basic">Basic</Option>
                  <Option value="professional">Professional</Option>
                  <Option value="enterprise">Enterprise</Option>
                </Select>
              </div>

              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Billing Duration
                </Typography>
                <Select
                    label="Select Duration"
                    value={newPackageData.duration}
                    onChange={(value) => handleNewPackageChange('duration', value)}
                >
                  <Option value="monthly">Monthly</Option>
                  <Option value="yearly">Yearly (20% discount)</Option>
                </Select>
              </div>

              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Payment Method
                </Typography>
                <Select
                    label="Select Payment Method"
                    value={newPackageData.paymentMethod}
                    onChange={(value) => handleNewPackageChange('paymentMethod', value)}
                >
                  <Option value="credit">Credit Card</Option>
                  <Option value="bank">Bank Transfer</Option>
                  <Option value="crypto">Cryptocurrency</Option>
                </Select>
              </div>

              {newPackageData.type && (
                  <Card className="mt-4 border border-blue-100">
                    <CardBody>
                      <Typography variant="h6" color="blue-gray" className="mb-3">
                        Package Summary
                      </Typography>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Typography variant="small" color="gray">
                            Package:
                          </Typography>
                          <Typography variant="small" className="font-bold capitalize">
                            {newPackageData.type}
                          </Typography>
                        </div>
                        <div className="flex justify-between">
                          <Typography variant="small" color="gray">
                            Billing:
                          </Typography>
                          <Typography variant="small" className="font-bold capitalize">
                            {newPackageData.duration || 'Not selected'}
                          </Typography>
                        </div>
                        <div className="flex justify-between">
                          <Typography variant="small" color="gray">
                            Payment:
                          </Typography>
                          <Typography variant="small" className="font-bold capitalize">
                            {newPackageData.paymentMethod || 'Not selected'}
                          </Typography>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
              )}
            </div>
          </DialogBody>
          <DialogFooter className="gap-2">
            <Button
                variant="outlined"
                color="blue-gray"
                onClick={() => setShowNewPackageForm(false)}
            >
              Cancel
            </Button>
            <Button
                color="green"
                disabled={!newPackageData.type || !newPackageData.duration || !newPackageData.paymentMethod}
                onClick={handleNewPackageSubmit}
            >
              Continue to Payment <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </DialogFooter>
        </Dialog>

        <Footer />
      </div>
  );
}
