import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import styles from "@/components/scrollbar.module.css";
import { Label } from './ui/label';

type VendorModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const VendorModal: React.FC<VendorModalProps> = ({ isOpen, onClose }) => {
  const [vendorName, setVendorName] = useState('');
  const [email, setEmail] = useState('');
  const [stateCity, setStateCity] = useState('Lagos');
  const [country, setCountry] = useState('Nigeria');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [postCode, setPostCode] = useState('');
  const [guarantorName, setGuarantorName] = useState('');
  const [mobileNumber1, setMobileNumber1] = useState('');
  const [mobileNumber2, setMobileNumber2] = useState('');

  const handleSave = () => {
    // Handle form submission
    console.log({
      vendorName,
      email,
      stateCity,
      country,
      address1,
      address2,
      postCode,
      guarantorName,
      mobileNumber1,
      mobileNumber2,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${styles.scrollbar} max-w-lg p-6 md:p-8 max-h-screen flex flex-col overflow-y-auto`}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold flex items-center">
              <div className='p-3 bg-gray-100 mr-2 rounded-full'>
              <Icon icon="iconamoon:profile-fill" className="text-3xl" />
              </div>
              Add A Vendor
            </DialogTitle>            
          </div>
        </DialogHeader>
        <form className="grid gap-4">
          <div className='flex flex-col gap-2'>
            <Label className="block text-sm font-medium text-gray-700">Vendor Name</Label>
            <Input type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} className='bg-white border-gray-200 rounded-md' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className="block text-sm font-medium text-gray-700">Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-white border-gray-200 rounded-md' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className="block text-sm font-medium text-gray-700">State/City</Label>
            <Select value={stateCity} onValueChange={(value) => setStateCity(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select State/City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Abuja">Abuja</SelectItem>
                <SelectItem value="Kano">Kano</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">Country</Label>
            <Select value={country} onValueChange={(value) => setCountry(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nigeria">Nigeria</SelectItem>
                <SelectItem value="Ghana">Ghana</SelectItem>
                <SelectItem value="Kenya">Kenya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <Label className="block text-sm font-medium text-gray-700">Address 1 (Optional)</Label>
            <Input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} className='bg-white border-gray-200 rounded-md' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className="block text-sm font-medium text-gray-700">Address 2 (Optional)</Label>
            <Input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} className='bg-white border-gray-200 rounded-md' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className="block text-sm font-medium text-gray-700">Post Code</Label>
            <Input type="text" value={postCode} onChange={(e) => setPostCode(e.target.value)} className='bg-white border-gray-200 rounded-md' />
          </div>

          <h3 className="text-lg font-semibold mt-4">Guarantor&apos;s Details</h3>

          <div className='flex flex-col gap-2'>
            <Label className="block text-sm font-medium text-gray-700">Name</Label>
            <Input type="text" value={guarantorName} onChange={(e) => setGuarantorName(e.target.value)} className='bg-white border-gray-200 rounded-md' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className="block text-sm font-medium text-gray-700">Mobile Number 1</Label>
            <Input type="text" value={mobileNumber1} onChange={(e) => setMobileNumber1(e.target.value)} className='bg-white border-gray-200 rounded-md' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className="block text-sm font-medium text-gray-700">Mobile Number 2</Label>
            <Input type="text" value={mobileNumber2} onChange={(e) => setMobileNumber2(e.target.value)} className='bg-white border-gray-200 rounded-md' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className="block text-sm font-medium text-gray-700">State/City</Label>
            <Select value={stateCity} onValueChange={(value) => setStateCity(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select State/City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Abuja">Abuja</SelectItem>
                <SelectItem value="Kano">Kano</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <Label className="block text-sm font-medium text-gray-700">Country</Label>
            <Select value={country} onValueChange={(value) => setCountry(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nigeria">Nigeria</SelectItem>
                <SelectItem value="Ghana">Ghana</SelectItem>
                <SelectItem value="Kenya">Kenya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
