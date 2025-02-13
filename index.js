import { create } from '@web3-storage/w3up-client';
import fs from 'fs/promises';

async function main() {

    //create client
    const client = await create();

    //log into account & replace with your email
    const account = await client.login('YOUR_EMAIL_HERE@storacha.network')

    // Wait for a payment plan with a 1-second polling interval and 15-minute timeout
    await account.plan.wait();

    //create space
    const space = await client.createSpace("disco-racha-1", { account });
    console.log(`Space created with DID: ${space.did()}`);

    //set new space as current
    await client.setCurrentSpace(space.did());
    console.log(`Current space set to: ${space.did()}`);

    //read file
    const filePath = './disco-racha-1.txt';
    const fileContent = await fs.readFile(filePath);

    //convert file to blob
    const file = new File([fileContent], 'disco-racha-1.txt');

    //upload file
    const cid = await client.uploadFile(file);
    console.log(`File uploaded successfully. CID: ${cid}`);
  }
  
  //return errors
  main().catch((err) => {
    console.error('Error:', err);});
