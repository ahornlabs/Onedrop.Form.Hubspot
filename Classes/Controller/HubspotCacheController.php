<?php
declare(strict_types=1);
namespace Onedrop\Form\Hubspot\Controller;

use Neos\Cache\Frontend\VariableFrontend;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\Controller\ActionController;
use Neos\Flow\Security\Context as SecurityContext;

class HubspotCacheController extends ActionController
{
    /**
     * Injection configured via Objects.yaml
     *
     * @var VariableFrontend
     */
    protected $cache = null;

    /**
     * @Flow\Inject
     * @var SecurityContext
     */
    protected $securityContext;

    protected $supportedMediaTypes = ['application/json'];

    protected $defaultViewObjectName = \Neos\Flow\Mvc\View\JsonView::class;

    /**
     * Flushes the Hubspot forms cache so the SelectBox reloads fresh data from the API.
     */
    public function flushAction(): void
    {
        if (!$this->securityContext->hasRole('Neos.Neos:Editor')) {
            $this->response->setStatusCode(403);
            $this->view->assign('value', ['success' => false, 'message' => 'Forbidden']);
            return;
        }

        $this->cache->flush();

        $this->view->assign('value', ['success' => true]);
    }
}
