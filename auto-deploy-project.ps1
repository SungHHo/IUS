$AZURE_ENV_NAME="app-$(Get-Random)"
$AZURE_LOCATION="koreacentral"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$form = New-Object System.Windows.Forms.Form
$form.Text = 'Input your Azure Resource Group.'
$form.Size = New-Object System.Drawing.Size(400,100)
$form.StartPosition = 'CenterScreen'

$okButton = New-Object System.Windows.Forms.Button
$okButton.Location = New-Object System.Drawing.Point(310, 20)
$okButton.Size = New-Object System.Drawing.Size(70,20)
$okButton.Text = 'Ok'
$okButton.DialogResult = [System.Windows.Forms.DialogResult]::OK
$form.AcceptButton = $okButton
$form.Controls.Add($okButton)

$textBox = New-Object System.Windows.Forms.TextBox
$textBox.Location = New-Object System.Drawing.Point(10,20)
$textBox.Size = New-Object System.Drawing.Size(300,20)
$form.Controls.Add($textBox)

$form.Topmost = $true

$form.Add_Shown({$textBox.Select()})
$result = $form.ShowDialog()

if ($result -eq [System.Windows.Forms.DialogResult]::OK)
{
    $AZURE_RESOURCE_GROUP = $textBox.Text
    Add-Type -AssemblyName System.Windows.Forms
    Add-Type -AssemblyName System.Drawing


    $form = New-Object System.Windows.Forms.Form
    $form.Text = 'Input your Github ID'
    $form.Size = New-Object System.Drawing.Size(400,100)
    $form.StartPosition = 'CenterScreen'

    $okButton = New-Object System.Windows.Forms.Button
    $okButton.Location = New-Object System.Drawing.Point(310, 20)
    $okButton.Size = New-Object System.Drawing.Size(70,20)
    $okButton.Text = 'Ok'
    $okButton.DialogResult = [System.Windows.Forms.DialogResult]::OK
    $form.AcceptButton = $okButton
    $form.Controls.Add($okButton)

    $textBox = New-Object System.Windows.Forms.TextBox
    $textBox.Location = New-Object System.Drawing.Point(10,20)
    $textBox.Size = New-Object System.Drawing.Size(300,20)
    $form.Controls.Add($textBox)


    $form.Topmost = $true
    $form.Add_Shown({$textBox.Select()})
    $result = $form.ShowDialog()

    if ($result -eq [System.Windows.Forms.DialogResult]::OK)
    {
        $GITHUB_ID = $textBox.Text
        az login
        az group create --name $AZURE_RESOURCE_GROUP --location $AZURE_LOCATION

        # App Service Plan Create
        az appservice plan create --name $AZURE_ENV_NAME-plan --resource-group $AZURE_RESOURCE_GROUP --location $AZURE_LOCATION --sku B1

        # Set App Startup-File
        az webapp config set --name $AZURE_ENV_NAME --resource-group $AZURE_RESOURCE_GROUP --startup-file "npm start"

        # Web App Create
        az webapp create --name $AZURE_ENV_NAME --plan $AZURE_ENV_NAME-plan --resource-group $AZURE_RESOURCE_GROUP
        
        
        timeout 5

        # Github Workflows Settings
        az webapp deployment list-publishing-profiles --name $AZURE_ENV_NAME --resource-group $AZURE_RESOURCE_GROUP --xml > publish_profile.xml

        gh auth login
        gh secret set AZURE_APP_NAME --repo $GITHUB_ID/IUS --body $AZURE_ENV_NAME
        cat .\publish_profile.xml | gh secret set AZURE_WEBAPP_PUBLISH_PROFILE --repo $GITHUB_ID/IUS
        pause
    }
}